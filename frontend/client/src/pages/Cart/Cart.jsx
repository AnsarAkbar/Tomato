import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as Yup from 'yup'

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  let cartCategorys = [
    "Items",
    "Title",
    "Price",
    "Quantity",
    "Total",
    "Remove",
  ];

  const validationSchema = Yup.object().shape({
    promoCode: Yup.string()
      .required("Promo Code is required")
  });

  return (
    <>
      <div>
        <div>
          <div className="grid grid-cols-6 items-center text-gray-600 text-lg py-3">
            {cartCategorys.map((items, index) => (
              <p key={index} className="m-auto">
                {items}
              </p>
            ))}
          </div>
          <hr />
        </div>
        <div>
          {foodList.map((item, index) =>
            cartItems[item._id] > 0 ? (
              <div className="">
                <div className="grid grid-cols-6 items-center text-black text-lg py-3">
                  <img src={item.image} alt="" className="w-12 m-auto" />
                  <p className="m-auto">{item.name}</p>
                  <p className="m-auto">${item.price}</p>
                  <p className="m-auto">{cartItems[item._id]}</p>
                  <p className="m-auto">${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="m-auto cursor-pointer"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="flex justify-between py-20 max-md:flex-col-reverse max-md:gap-8">
        <div className="w-1/2 max-md:w-full">
          <p className="text-2xl font-bold font-outfit ">Cart Totals</p>
          <div className="flex justify-between items-center text-black text-lg py-3">
            <p>Subtotal</p>
            <p>${getCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center text-black text-lg py-3">
            <p>Delivery Fee</p>
            <p>${getCartAmount() > 0 ? 4 : 0}</p>
          </div>
          <hr />
          <div className="flex justify-between items-center text-black text-lg py-3">
            <p>Total</p>
            <p>${getCartAmount() > 0 ? getCartAmount() + 4 : 0}</p>
          </div>
          <hr />
          <button
            onClick={() => navigate("/order")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-7 py-4 mt-5 rounded-md text-md duration-300"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <Formik
          initialValues={{
            promoCode: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="w-1/3 max-md:w-full">
              <p className=" text-black text-lg py-3">
                If you have a promo code, enter it here
              </p>
              <div className="flex">
                <TextField
                  name="promoCode"
                  id="outlined-basic"
                  label="Promo code"
                  variant="outlined"
                  className="w-full"
                  onChange={handleChange}
                />
                <button type="submit" className=" bg-orange-600 hover:bg-orange-700 text-white px-9 py-4 rounded-md text-md duration-200" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
              {isSubmitting && <p>Submitting...</p>}
              <Typography variant="body2" className="text-red-600">
                <ErrorMessage name="promoCode" />
              </Typography>
            </form>
          )}
        </Formik>

      </div>
    </>
  );
};

export default Cart;
