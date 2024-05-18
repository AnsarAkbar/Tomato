import React, { useContext,useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

import Card from './Card';

const FoodDisplay = ({ category }) => {
  const {food_list} = useContext(StoreContext)

  // if (!category || !category.menu_name) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <>
      <h3 className="text-2xl font-bold font-outfit py-10">Top dishes near you</h3>
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



// import React, { useContext, useState } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import Card from "./Card";

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   // if (!category || !category.menu_name) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <>
//       <h3 className="text-2xl font-bold font-outfit py-10">
//         Top dishes near you
//       </h3>
//       <div className="flex gap-10">
//         {category === "All" 
//           ? food_list.map((value, index) => <Card key={index} value={value} />)
//           : food_list
//               .filter((item) => item.category === category)
//               .map((value, index) => <Card key={index} value={value} />)}
//       </div>
//     </>
//   );
// };

// export default FoodDisplay;

