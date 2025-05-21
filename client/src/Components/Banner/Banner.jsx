import React from "react";
import { assets } from "../../assets/assets";


const Banner = () => {
  return (
    <section
      id="hero-section"
      className="py-16 mx-auto rounded-[10px] h-[570px]"
      style={{
        background: `url(${assets.header_img}) no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        objectPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-end h-full">
        <div className="md:w-full lg:w-[70%] text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-white ">
            Order your <br /> favourite food here
          </h1>
          <p className="text-primary mb-8 text-white">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button
            href="#"
            className="inline-block bg-white text-black py-2 px-6 rounded-full text-lg hover:bg-red-600 duration-500 hover:text-white"
          >
            View Menu
          </button>
          {/* <Button variant="outlined">Outlined</Button> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
