import React, { useContext,useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

import Card from './Card';

const FoodDisplay = ({ category }) => {
  const {food_list} = useContext(StoreContext)
  
  return (
    <>
      <h3 className="text-2xl font-bold font-outfit py-10 max-md:text-center">Top dishes near you</h3>
      <div className="flex justify-between mb-12 flex-wrap">
        {food_list.map((value, index) =>
          category === "All" || category.menu_name === value.category ?
           (<Card key={index} food_list={food_list} value={value}/>)
             : null
        )}
      </div>
    </>
  );
};

export default FoodDisplay;