import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div>
      <div id="our-menu" className="py-14 text-center">
        <h3 className="text-2xl font-bold font-outfit mb-4">Explore our menu</h3>
        <p className="mb-7 px-4 max-w-2xl mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
          soluta maiores tenetur nesciunt et accusantium libero aliquid
          veritatis debitis perspiciatis ducimus nihil porro molestiae eum
          temporibus non cupiditate quibusdam sint.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {menu_list.map((value, index) => (
            <div
              key={index}
              onClick={() => setCategory(value)}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={value.menu_image}
                alt={value.menu_name}
                className={`${
                  category.menu_name === value.menu_name
                    ? "border-2 border-orange-600 p-[3px] rounded-full"
                    : ""
                } w-16 h-16 md:w-20 md:h-20 mx-auto`}
              />
              <div className="text-center mt-2 text-sm md:text-base">{value.menu_name}</div>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
