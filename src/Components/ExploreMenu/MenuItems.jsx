import React from "react";
import { assets, food_list } from "../../assets/assets";

const MenuItems = ({ category }) => {

  if (!category || !category.menu_name) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <h3 className="text-2xl font-bold font-outfit py-10">Top dishes near you</h3>
      <div className="flex gap-10">
        {food_list.map((value, index) =>
          category === "All" || category.menu_name === value.category ?
           (<div key={index} className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 duration-200">
              <img src={value.image} alt={value.name} className="w-full"/>
              <div className="p-5 relative ">
              <img src={assets.add_icon_white} alt="add_icon" className="absolute z-10 -top-16 right-5 cursor-pointer"/>
                <div className="flex justify-between align-middle">
                  <h3 className="text-xl font-bold font-outfit">{value.name}</h3>
                  <img src={assets.rating_starts} alt="rating_starts" className="h-[70%]"/>
                </div>
                <div>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus, itaque, ipsum molestias provident quo deleniti ad
                  aut sequi quibusdam, impedit ut neque repellendus fuga facilis
                  maxime obcaecati ipsam accusamus facere.
                </div>
                <h3 className="size-3 font-outfit text-orange-600 font-black" >${value.price}</h3>
              </div>
            </div>)
             : null
        )}
      </div>
    </>
  );
};

export default MenuItems;
