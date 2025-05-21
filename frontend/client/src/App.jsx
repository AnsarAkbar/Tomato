import React, { useState } from "react";
import "./index.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Footer from "./Components/Footer/Footer";
import AppDownload from "./Components/AppDownload/AppDownload";
import LoginPop from "./Components/LoginPop/LoginPop";

const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
      {/* <div className="text-center">oبِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div> */}
      {showLogin?<LoginPop showLogin={showLogin} setShowLogin={setShowLogin}/>:<></>}
      <Navbar setShowLogin={setShowLogin}/>
      <div className="max-w-[1920px] m-auto px-16 max-lg:px-10 max-md:px-5">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/order" element={<Placeorder />}/>
      </Routes>
        <AppDownload />
      </div>
      <Footer />
    </>
  );
};

export default App;
