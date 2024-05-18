import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const { assets } = useContext(StoreContext);
  let { logo, linkedin_icon, facebook_icon, twitter_icon } = assets;
  const footerList = ["Home", "About Us", "Delivery", "Privecy Policy"];

  return (
    <div className="bg-slate-900">
      <div className="max-w-[1920px] m-auto px-16 max-lg:px-10 max-md:px-5 py-16 flex text-white">
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
          <div className="flex">
            <img src={facebook_icon} alt="" />
            <img src={twitter_icon} alt="" />
            <img src={linkedin_icon} alt="" />
          </div>
        </div>
        <div className="ml-5">
          <div>
            <h3>COMPANY</h3>
            {footerList.map((value, index) => (
              <div key={index} className="py-1">
                <NavLink
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
            <h3>GET IN TOUCH</h3>
            <div>
              <Link>+123459876</Link>
            </div>
            <Link>exemple1234@gmail.com</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
