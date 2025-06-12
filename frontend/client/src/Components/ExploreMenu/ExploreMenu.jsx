import React, { useEffect } from "react";
import { menu_list } from "../../assets/assets";
import useFetch from "../../Hooks/useFetch";

const ExploreMenu = ({ category, setCategory }) => {
  const { data, error, loading, fetchData } = useFetch();
  
  useEffect(() => {
    fetchData({
      url: `${import.meta.env.VITE_API_URL}/client/categories`,
      method: "GET",
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;
  if (data.length === 0) return <div>No category found</div>;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-4">
            Explore our menu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a variety of delicious categories to satisfy every craving. Browse our menu to find your favorite dishes, from appetizers to desserts, all freshly prepared and ready to enjoy.
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable container */}
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex space-x-4 min-w-max px-2">
              {data.map((value, index) => (
                <button
                  key={index}
                  onClick={() => setCategory(value)}
                  className={`group flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-[100px] ${
                    category.name === value.name
                      ? 'bg-orange-50 ring-2 ring-orange-500'
                      : 'bg-white hover:bg-orange-50 hover:ring-1 hover:ring-orange-200'
                  }`}
                >
                  <div className={`relative w-16 h-16 mb-2 transition-transform duration-300 group-hover:scale-110 ${
                    category.name === value.name ? 'scale-110' : ''
                  }`}>
                    <img
                      src={value.image}
                      alt={value.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    {category.name === value.name && (
                      <div className="absolute inset-0 rounded-full ring-2 ring-orange-500 animate-pulse"></div>
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                    category.name === value.name
                      ? 'text-orange-600'
                      : 'text-gray-700 group-hover:text-orange-600'
                  }`}>
                    {value.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
