import React from "react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  let navpages=["home","menu","mobile app","contact us"]
  let navurl=["/","/menu","/mobileapp","/contactus"]
  let navimges=["search_icon","basket_icon"]
  return (
    <>
      <header className="bg-white shadow font-outfit">  
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src={assets.logo} alt="" />
          <nav className="space-x-5 text-xl ">
            {
              navpages.map((values,index)=>(
                <a href={navurl[index]} key={index} className={({isactive})=> isactive? "text-yellow-800 hover:text-yellow-500":"text-gray-800 hover:text-orange-500"}>{values}</a>
              ))
            }
          </nav>
          <div className="flex items-center space-x-4">
            <img src={assets.search_icon} alt="" />
            <img src={assets.basket_icon} alt="" />
            <button className="bg-transparent text-[16px] text-[#49557e] border border-[tomato] px-[30px] py-[10px] rounded-full cursor-pointer hover:bg-orange-200 duration-[0.5s]">sign in</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
