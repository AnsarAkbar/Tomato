import React, { useContext, useState } from "react";
import { assets } from '../../assets/assets';
import { StoreContext } from "../../context/StoreContext";

const Card = ({product}) => {
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

    return (
      <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-[24%] max-lg:w-[32.7%] max-md:w-[49%] mb-6">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute top-3 right-3">
            {!cartItems[product._id] ? (
              <button
                onClick={() => addToCart(product._id)}
                className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
              >
                <img
                  src={assets.add_icon_white}
                  alt="add_icon"
                  className="w-6 h-6"
                />
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-md">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <img
                    src={assets.remove_icon_red}
                    alt="remove icon"
                    className="w-5 h-5"
                  />
                </button>
                <span className="font-semibold text-gray-800">{cartItems[product._id]}</span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <img
                    src={assets.add_icon_green}
                    alt="add icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 font-outfit max-md:text-lg">{product.name}</h3>
            <img
              src={assets.rating_starts}
              alt="rating_starts"
              className="h-5 max-md:h-4"
            />
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description.length > 50
              ? `${product.description.slice(0, 50)}...`
              : product.description}
          </p>
          
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-orange-600 font-outfit">
              ${product.price}
            </h3>
            <button 
              onClick={() => addToCart(product._id)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default Card;
