import { TextField } from "@mui/material";
import { useContext} from "react";
import { StoreContext } from "../../context/StoreContext";
import *as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { json, useNavigate } from "react-router-dom";

const Placeorder = () => {
  // const cartTotalCategoryes = ["Subtotal", "Delivey Fee", "Total"];
  const validationSchema=Yup.object({
    firstName:Yup.string()
    .required("First name is required!"),
    lastName:Yup.string()
    .required("Last name is required!"),
    email:Yup.string()
    .required("email address is required!"),
    Street:Yup.string()
    .required("street is required!"),
    street:Yup.string()
    .required("Street is required!"),
    city:Yup.string()
    .required('City is required!'),
    zipcode:Yup.string()
    .required("zipcode is required!"),
    country:Yup.string()
    .required('Country is required!'),
    phone:Yup.number()
    .required("Phone number is required!"),
    state:Yup.string()
    .required('State is required!')

  })

  useNavigate
  const { getCartAmount } = useContext(StoreContext);
  return (
      <Formik initialValues={{firstName:"",lastName:"",email:"",street:"",city:"",zipcode:"",country:"",phone:"",state:""}}
      validationSchema={validationSchema}
      >
        {({errors})=>(
         <Form>
           <div className="flex gap-32  my-24 max-md:flex-wrap max-md:gap-20">
          <form action="" className="flex flex-col gap-5 w-1/2 max-md:w-full">
            <p className="text-2xl font-bold font-outfit mb-4 ">
              {/* Delivery Information
              {JSON.stringify(errors)} */}
            </p>
    
            <div className="flex gap-5">
              <Field
                as={TextField}
                id="outlined-basic"
                name="firstName"
                label="First name"
                variant="outlined"
                className="w-full"
                error={errors.firstName && Boolean(errors.firstName)}
                required
                helperText={<ErrorMessage name="firstName" />}
              />
              <Field
                as={TextField}
                id="outlined-basic"
                name="lastName"
                label="Lastname"
                variant="outlined"
                className="w-full"
                required
                helperText={<ErrorMessage name="lastName"/>}
                error={errors.lastName && Boolean(errors.lastName)}
              />
            </div>
            <Field
            as={TextField}
              id="outlined-basic"
              name="email"
              label="Email address"
              variant="outlined"
              className="w-full"
              error={errors.email && Boolean(errors.email)}
              helperText={<ErrorMessage name="email" />}      
            />
            <Field
            as={TextField}
              id="outlined-basic"
              name="street"
              label="Street"
              variant="outlined"
              className="w-full"
              required
              error={errors.street && Boolean(errors.street)}
              helperText={<ErrorMessage name="street"/>}
            />
            <div className="flex gap-5">
              <Field
                as={TextField}
                id="outlined-basic"
                name="city"
                label="city"
                variant="outlined"
                className="w-full"
                required
                error={errors.city && Boolean(errors.city)}
                helperText={<ErrorMessage name="city"/>}
              />
              <Field
              as={TextField}
                id="outlined-basic"
                name="state"
                label="State"
                variant="outlined"
                className="w-full"
                required
                error={errors.state && Boolean(errors.state)}
                helperText={<ErrorMessage name="state"/>}
              />
            </div>
            <div className="flex gap-5">
              <Field
              as={TextField}
                id="outlined-basic"
                name="zipcode"
                label="Zip code"
                variant="outlined"
                className="w-full"
                required
                error={errors.zipcode && Boolean(errors.zipcode)}
                helperText={<ErrorMessage name="zipcode"/>}
              />
              <Field
              as={TextField}
                id="outlined-basic"
                name="country"
                label="Country"
                variant="outlined"
                className="w-full"
                required
                error={errors.country && Boolean(errors.country)}
                helperText={<ErrorMessage name="country"/>}
              />
            </div>
            <Field
            as={TextField}
              id="outlined-basic"
              name='phone'
              label="Phone"
              variant="outlined"
              className="w-full"
              required
              error={errors.phone && Boolean(errors.phone)}
              helperText={<ErrorMessage name="phone"/>}
            />
          </form>
          <div className="w-1/2 max-md:w-full">
            <p className="text-2xl font-bold font-outfit mb-4 ">Cart Totals</p>
              <div className="flex justify-between items-center text-black text-lg py-3">
                <p>Subtotal</p>
                <p>${getCartAmount()}</p>
              </div>
              <hr />
              <div className="flex justify-between items-center text-black text-lg py-3">
                <p>Delivey Fee</p>
                <p>${getCartAmount() > 0 ?4:0}</p>
              </div>
              <hr />
              <div className="flex justify-between items-center text-black text-lg py-3">
                <p>Total</p>
                <p>${getCartAmount()>0 ? getCartAmount()+4:0}</p>
              </div>
              <hr />
            <button
              type="submite"
              onClick={() => navigate("/order")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 mt-9 rounded-md text-md duration-200"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
         </Form>
        )}
    </Formik>
  );
};

export default Placeorder;
