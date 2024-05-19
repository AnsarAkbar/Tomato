import React from "react";
import { assets } from "../../assets/assets";

const Navbar = ({setShowLogin}) => {
  let navpages = ["home", "menu", "mobile app", "contact us"];
  let navurl = ["/", "/menu", "/mobileapp", "/contactus"];

  return (
    <>
      <header className="bg-white font-outfit max-w-[1920px] px-16 max-lg:px-10 max-md:px-5">
        <div className="mx-auto py-4 flex justify-between items-center">
          <img src={assets.logo} alt="" className="max-md:w-28" />
          <nav className="space-x-5 text-xl max-lg:hidden max-sm:hidden ">
            {navpages.map((values, index) => (
              <a
                href={navurl[index]}
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
            <img src={assets.search_icon} alt="" className="w-5" />
            <img src={assets.basket_icon} alt="" className="w-5" />
            <button onClick={()=>setShowLogin(true)} className="bg-transparent text-[16px] text-[#49557e] border border-[tomato] px-7 py-2 rounded-full cursor-pointer hover:bg-orange-200 duration-[0.5s] max-md:py-1 max-md:px-4">
              sign in
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
