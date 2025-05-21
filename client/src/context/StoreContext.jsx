import React, { createContext, useState } from "react";
import { assets, food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const [total, settotal] = useState(0)

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: cartItems[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: cartItems[itemId] - 1 }));
  };


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let itemInfo=food_list.find((intemsInfo) => intemsInfo._id === key);
        totalAmount +=itemInfo.price * cartItems[key];
      }
    }
    return (totalAmount)
  };
  

  const contextValue = {
    food_list,
    assets,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
