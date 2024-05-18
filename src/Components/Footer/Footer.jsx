import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const { assets } = useContext(StoreContext);
  let { logo, linkedin_icon, facebook_icon, twitter_icon } = assets;
  const footerList = ["Home", "About Us", "Delivery", "Privecy Policy"];
  const icons = [linkedin_icon, facebook_icon, twitter_icon];

  return (
    <div className="bg-[#302F30]">
      <div className="max-w-[1920px] m-auto px-16 max-lg:px-10 max-md:px-5 py-16 flex justify-between text-white">
        <div className="w-1/2 ">
          <img src={logo} alt="" />
          <p className="py-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus cum
            rem incidunt quae reiciendis in consequuntur odit quam,
            voluptatibus, illo ipsa et eligendi reprehenderit voluptates
            pariatur inventore? Rem, blanditiis quaerat. Sed dolorem impedit
            aliquid poribus accusamus omnis, quisquam autem unde nihil mollitia
            architecto aspernatur quia, commodi numquam neque at sapiente! Est,
            neque distinctio. Commodi dolores velit nam recusandae esse!
          </p>
          <div className="flex gap-3">
            {icons.map((iconsImg, index) => (
              <img
                src={iconsImg}
                key={index}
                alt="icon"
                className="cursor-pointer hover:bg-orange-600 rounded-full"
              />
            ))}
          </div>
        </div>
        <div className="ml-5 flex justify-evenly w-[40%]">
          <div>
            <h3 className="text-2xl font-bold font-outfit">COMPANY</h3>
            {footerList.map((value, index) => (
              <div key={index} className="py-0.3 pt-5">
                <NavLink
                  to={value === "Home" ? "/" : "/${value}"}
                  className={({ isActive }) =>
                    isActive ? "text-orange-600 border-b-orange-600" : ""
                  }
                >
                  {" "}
                  {value}{" "}
                </NavLink>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-bold font-outfit">GET IN TOUCH</h3>
            <div className="pt-5 pb-1">
              <Link>+123459876</Link>
            </div>
            <Link>exemple1234@gmail.com</Link>
          </div>
        </div>
      </div>
      <hr className="h-1 py-2 texxt-white"/>
      <div className="text-white text-center pb-3">Copyright 2024 © Tomato.com-All Right Reserved</div>
    </div>
  );
};

export default Footer;
