import React, { useContext } from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div id="app-download" className="my-24">
      <div className="text-4xl font-extrabold font-outfit text-center leading-10 max:font-bold max-md:text-2xl max-md:font-bold max-md:font-outfit">
        For Better Experience Download <br />
        Tomato App
      </div>
      <div className="flex justify-center gap-3 py-4">
        <img
          src={assets.play_store}
          alt=""
          className="transform hover:scale-105 transition duration-1000 cursor-pointer max-md:w-24"
        />
        <img
          src={assets.app_store}
          alt=""
          className="transform hover:scale-105 transition duration-1000 cursor-pointer max-md:w-24"
        />
      </div>
    </div>
  );
};

export default AppDownload;
