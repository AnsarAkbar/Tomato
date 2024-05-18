import React, { useContext, useState } from "react";
import { assets } from '../../assets/assets';
import { StoreContext } from "../../context/StoreContext";

const Card = ({value}) => {
    const {cartItems,addToCart,removeFromCart}=useContext(StoreContext)


    // console.log("cartItems",cartItems);

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl w-[24%]  mb-[1.3%]">
      <img src={value.image} alt={value.name} className="w-full" />
      <div className="p-5 relative ">
        {/* <img src={assets.add_icon_white} alt="add_icon" className="absolute z-10 -top-16 right-5 cursor-pointer"/> //hover:scale-105 duration-200*/}
        <div className="absolute z-10 -top-16 right-2">
          {!cartItems[value._id] ? (
            <img
              src={assets.add_icon_white}
              onClick={() =>addToCart(value._id)}
              alt="add_icon"
              className="cursor-pointer "
            />
          ) : (
            <div className="flex bg-white gap-2 p-1 rounded-[50px] items-center">
              <img
                src={assets.remove_icon_red}
                onClick={() =>removeFromCart(value._id)}
                alt="remove icon"
              />
              {cartItems[value._id]}
              <img
                src={assets.add_icon_green}
                onClick={() => addToCart(value._id)}
                alt="add icon"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between align-middle">
          <h3 className="text-xl font-bold font-outfit">{value.name}</h3>
          <img
            src={assets.rating_starts}
            alt="rating_starts"
            className="h-[70%]"
          />
        </div>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus,
          itaque.
        </div>
        <h3 className="size-3 font-outfit text-orange-600 font-black">
          ${value.price}
        </h3>
      </div>
    </div>
  );
};

export default Card;
