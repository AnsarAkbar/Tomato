import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Cart = () => {

  const navigate=useNavigate()

  let cartCategorys = [
    "Items",
    "Title",
    "Price",
    "Quantity",
    "Total",
    "Remove",
  ];
  const cartTotalCategoryes = ["Subtotal", "Delivey Fee", "Total"];
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

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
          {food_list.map((item, index) =>
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
                {/* <p>{...item[]price,item.price}</p> */}
                <hr />
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="flex justify-between py-20 max-md:flex-col-reverse max-md:gap-8">
        <div className="w-1/2 max-md:w-full">
          <p className="text-2xl font-bold font-outfit ">Cart Totals</p>
          {cartTotalCategoryes.map((values, index) => (
            <>
              <div className="flex justify-between items-center text-black text-lg py-3">
                <p>{values}</p>
                <p>${values === "Delivey Fee" ? 2 : 0}</p>
              </div>
              <hr />
            </>
          ))}
          {/* <Button variant="outlined" sx={{Padding:'15px', marginTop:'20px', color:"orange", borderColor:"orange", ":hover"}}>PROCEED TO CHECKOUT</Button> */}
          <button onClick={()=>navigate('/order')} className="bg-black hover:bg-orange-600 text-white px-7 py-4 mt-5 rounded-md text-md duration-300">
          PROCEED TO CHECKOUT
            </button>
        </div>
        <div className="w-1/3 max-md:w-full">
          <p className=" text-black text-lg py-3">
            If you have promo code .Enter it there
          </p>
          <div className="flex">
            <TextField
              id="outlined-basic"
              label="promo code"
              variant="outlined"
              className="w-full"
              required
            />
            <button className="bg-black hover:bg-orange-600 text-white px-9 py-4 rounded-md text-md duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
