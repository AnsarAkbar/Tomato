import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import AppDownload from '../Components/AppDownload/AppDownload';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1920px] m-auto px-16 max-lg:px-10 max-md:px-5">
        <Outlet />
        <AppDownload />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout; 