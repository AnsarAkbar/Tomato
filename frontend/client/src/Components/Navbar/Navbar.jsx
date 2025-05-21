import React, { useContext, useRef } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Cart from "../../pages/Cart/Cart";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  let navpages = ["home", "menu", "mobile app", "contact us"];
  let navURL = ["/", "#our-menu", "#app-download", "#cantact-us"];

  const { searchValue, setSearchValue } = useContext(StoreContext);
  const debounceRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchValue);
  };

  return (
    <>
      <header className="bg-white font-outfit max-w-[1920px] px-16 m-auto max-lg:px-10 max-md:px-5">
        <div className="mx-auto py-4 flex justify-between items-center">
          <Link to={'/'}><img src={assets.logo} alt="" className="max-md:w-28" /></Link>
          <nav className="space-x-5 text-xl max-lg:hidden max-sm:hidden ">
            {navpages.map((values, index) => (
              <a
                href={values === "home" ? "/" : navURL[index]}
                key={index}
                className={({ isactive }) =>
                  isactive
                    ? "text-yellow-800 hover:text-yellow-500"
                    : "text-gray-800 hover:text-orange-500"
                }
              >
                {values}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {/* <img src={assets.search_icon} alt="" className="w-5 cursor-pointer" /> */}

            {/* Search Bar (customized for your website design) */}
            <form className="flex items-center bg-[#f5f5f5] rounded-full px-2 py-1 shadow-sm border border-gray-200 focus-within:border-orange-500 transition-all duration-200 max-w-xs md:max-w-md lg:max-w-lg" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                id="search-navbar"
                className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-800 placeholder-gray-400 rounded-full text-sm"
                placeholder="Search for food, categories..."
                required
                value={searchValue}
                onChange={handleInputChange}
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 ml-2 flex items-center transition-colors duration-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>

            <Link to='/cart'><img onClick={() => <Cart />} src={assets.basket_icon} alt="" className="w-5" /></Link>
            <button onClick={() => setShowLogin(true)} className="bg-transparent text-[16px] text-[#49557e] border border-[tomato] px-7 py-2 rounded-full cursor-pointer hover:bg-orange-200 duration-[0.5s] max-md:py-1 max-md:px-4">
              sign in
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
