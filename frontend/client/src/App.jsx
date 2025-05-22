import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ContactUs from "./Components/ContactUs/ContactUs";

const App = () => {
  return (
    <Router>
       <Routes>
      {/* Auth Routes */}
      {/* <Route element={<AuthLayout />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      {/* </Route> */}

      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/order" element={
          <PrivateRoute>
            <Placeorder />
          </PrivateRoute>
        } />
        <Route path="/contact" element={<ContactUs />} />
      </Route>
    </Routes>
    </Router>
  );
};

export default App;
