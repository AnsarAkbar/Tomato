import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Cart from "../../pages/Cart/Cart";

const Navbar = ({setShowLogin}) => {
  let navpages = ["home", "menu", "mobile app", "contact us"];
  let navURL = ["/", "#our-menu", "#app-download", "#cantact-us"];

  return (
    <>
      <header className="bg-white font-outfit max-w-[1920px] px-16 m-auto max-lg:px-10 max-md:px-5">
        <div className="mx-auto py-4 flex justify-between items-center">
          <Link to={'/'}><img src={assets.logo} alt="" className="max-md:w-28" /></Link>
          <nav className="space-x-5 text-xl max-lg:hidden max-sm:hidden ">
            {navpages.map((values, index) => (
              <a
                href={values==="home"?"/":navURL[index]}
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
            <Link to='/cart'><img onClick={()=><Cart/>} src={assets.basket_icon} alt="" className="w-5" /></Link>
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
