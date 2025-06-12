import { TextField, Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Initialize Stripe with your publishable key
// console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Placeorder = () => {
  const { getCartAmount, cartItems, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  // Demo values for testing
  const demoValues = {
    name: "John Doe",
    email: "john.doe@example.com",
    street: "123 Main St",
    city: "New York",
    postalCode: "10001",
    country: "US",
    phone: "1234567890",
    state: "NY"
  };

  // Test card numbers for Stripe:
  // 4242 4242 4242 4242 - Visa (success)
  // 4000 0025 0000 3155 - Requires authentication
  // 4000 0000 0000 9995 - Will be declined

  // Load Stripe and create card element on mount
  useEffect(() => {
    let mounted = true;

    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      if (mounted && stripeInstance) {
        setStripe(stripeInstance);
        const elements = stripeInstance.elements();

        // Custom styling for the card element
        const card = elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
            },
            invalid: {
              color: '#d32f2f',
              iconColor: '#d32f2f',
            },
          },
          classes: {
            focus: 'is-focused',
            empty: 'is-empty',
            invalid: 'is-invalid',
          },
        });

        card.mount('#card-element');

        // Handle real-time validation errors
        card.on('change', (event) => {
          if (event.error) {
            setPaymentError(event.error.message);
          } else {
            setPaymentError(null);
          }
        });

        setCardElement(card);
      }
    };

    initializeStripe();

    return () => {
      mounted = false;
      if (cardElement) {
        cardElement.destroy();
      }
    };
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    street: Yup.string().required("Street is required!"),
    city: Yup.string().required('City is required!'),
    postalCode: Yup.string().required("Postal code is required!"),
    country: Yup.string().required('Country is required!'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .required("Phone is required!"),
    state: Yup.string().required('State is required!'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setPaymentError(null);

    try {
      // 1. Create Payment Intent
      const { data: { clientSecret } } = await axios.post(
        `${import.meta.env.VITE_API_URL}/client/orders/create-payment-intent`,
        { amount: (getCartAmount() + 4) * 100 }, // Convert to cents
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('clientToken')}`
          }
        }
      );

      // 2. Confirm Card Payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: values.name,
            address: {
              line1: values.street,
              city: values.city,
              postal_code: values.postalCode,
              country: values.country,
              state: values.state
            },
            email: values.email,
            phone: values.phone,
          },
        },
      });


      if (error) {
        setPaymentError(error.message);
        throw error;
      }

      // 3. Save Order to Backend
      const orderData = {
        deliveryAddress: { ...values },
        items: cartItems,
        subtotal: getCartAmount(),
        deliveryFee: 4,
        total: getCartAmount() + 4,
        status: paymentIntent.status,
        paymentId: paymentIntent.id,
      };
      // console.log('Token-->', localStorage.getItem('clientToken'))
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/client/orders/create`, orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('clientToken')}`
        }
      });
      setOrderSuccess(true);
      clearCart();
      setTimeout(() => navigate(`/order/${response.data._id}`), 2000);
    } catch (error) {
      console.log("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
        <p>You will be redirected to your order details shortly.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <Formik
        initialValues={demoValues} // Using demo values for testing
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Delivery Information */}
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>

                <div className="grid gap-4">
                  <Field
                    as={TextField}
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    name="street"
                    label="Street Address"
                    variant="outlined"
                    fullWidth
                    error={touched.street && Boolean(errors.street)}
                    helperText={touched.street && errors.street}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      variant="outlined"
                      fullWidth
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                    <Field
                      as={TextField}
                      name="state"
                      label="State/Province"
                      variant="outlined"
                      fullWidth
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      as={TextField}
                      name="postalCode"
                      label="Postal Code"
                      variant="outlined"
                      fullWidth
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      helperText={touched.postalCode && errors.postalCode}
                    />
                    <Field
                      as={TextField}
                      name="country"
                      label="Country"
                      variant="outlined"
                      fullWidth
                      error={touched.country && Boolean(errors.country)}
                      helperText={touched.country && errors.country}
                    />
                  </div>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getCartAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">$4.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(getCartAmount() + 4).toFixed(2)}</span>
                  </div>
                </div>

                <h3 className="font-medium mb-3 text-gray-700">Payment Details</h3>
                <div className="mb-4">
                  <div
                    id="card-element"
                    className="p-4 border rounded-lg bg-white shadow-sm"
                  ></div>
                  {paymentError && (
                    <div className="text-red-500 text-sm mt-2">{paymentError}</div>
                  )}
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <p>Test using Stripe test card: 4242 4242 4242 4242</p>
                  <p>Any future date, CVC, and 5-digit ZIP</p>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  className="py-3 bg-orange-600 hover:bg-orange-700 transition-colors"
                  disabled={loading || cartItems.length === 0 || !stripe || !cardElement}
                >
                  {loading ? "Processing..." : `Pay $${(getCartAmount() + 4).toFixed(2)}`}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Placeorder;