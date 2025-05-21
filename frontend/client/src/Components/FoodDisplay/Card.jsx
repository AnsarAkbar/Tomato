import React, { useContext, useState } from "react";
import { assets } from '../../assets/assets';
import { StoreContext } from "../../context/StoreContext";

const Card = ({product}) => {
    const {cartItems,addToCart,removeFromCart}=useContext(StoreContext)
    // console.log({product})


  return (
    <div className="rounded-2xl overflow-hidden shadow-xl w-[24%] max-lg:w-[32.7%] max-md:w-[49%]  mb-[1.3%]">
      <img src={product.image} alt={product.name} className="w-full" />
      <div className="p-5 relative max-md:p-2 max-md:py-5">
        <div className="absolute -top-16 right-2 ">
          {!cartItems[product._id] ? (
            <img
              src={assets.add_icon_white}
              onClick={() =>addToCart(product._id)}
              alt="add_icon"
              className="cursor-pointer "
            />
          ) : (
            <div className="flex bg-white gap-2 px-1 py-5 rounded-[50px] items-center h-4">
              <img
                src={assets.remove_icon_red}
                onClick={() =>removeFromCart(product._id)}
                alt="remove icon"
              />
              {cartItems[product._id]}
              <img
                src={assets.add_icon_green}
                onClick={() => addToCart(product._id)}
                alt="add icon"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold font-outfit max-md:text-[15px]">{product.name}</h3>
          <img
            src={assets.rating_starts}
            alt="rating_starts"
            className="h-[70%] max-md:w-[30%]"
          />
        </div>
        <div>
          {product.description.length > 50
            ? `${product.description.slice(0, 50)}...`
            : product.description}
        </div>
        <h3 className="size-3 font-outfit text-orange-600 font-black">
          ${product.price}
        </h3>
      </div>
    </div>
  );
};

export default Card;
