import React, { useEffect } from "react";
import { menu_list } from "../../assets/assets";
import useFetch from "../../Hooks/useFetch";

const ExploreMenu = ({ category, setCategory }) => {

  const { data, error, loading,fetchData  } = useFetch();
  useEffect(() => {
    fetchData({
      url: `http://localhost:8082/api/client/categories`,
      method: "GET",
    });
  }
  , []);
  // console.log("catego----->", data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;
  if (data.length === 0) return <div>No category found</div>;

  return (
    <div>
      <div id="our-menu" className="py-14 text-center">
        <h3 className="text-2xl font-bold font-outfit mb-4">Explore our menu</h3>
        <p className="mb-7 px-4 max-w-2xl mx-auto">
          Discover a variety of delicious categories to satisfy every craving. Browse our menu to find your favorite dishes, from appetizers to desserts, all freshly prepared and ready to enjoy.
        </p>
        <div className="overflow-x-auto whitespace-nowrap py-4">
          <div className="inline-flex gap-4">
            {data.map((value, index) => (
              <div
                key={index}
                onClick={() => setCategory(value)}
                className="flex flex-col items-center cursor-pointer max-md:w-[100px] max-md:h-[100px] overscroll-none"
              >
                <img
                  src={value.image}
                  alt={value.name}
                  className={`${
                    category.name === value.name
                      ? "border-2 border-orange-600 p-[3px] rounded-full"
                      : ""
                  } w-20 h-20 mx-auto`}
                />
                <div className="text-center mt-2 text-sm md:text-base">
                  {value.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
