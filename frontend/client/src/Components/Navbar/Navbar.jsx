import React, { useContext, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useAuth } from "../../Hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchValue, setSearchValue, cartItems } = useContext(StoreContext);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const debounceRef = useRef();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "#our-menu" },
    { name: "Mobile App", path: "#app-download" },
    { name: "Contact Us", path: "/contact" }
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchValue(value);
    }, 200);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchValue);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={assets.logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search, Cart, and Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center bg-gray-50 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:bg-white transition-all duration-300"
            >
              <input
                type="search"
                placeholder="Search for food..."
                className="bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder-gray-400 w-40 lg:w-64"
                value={searchValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="text-gray-400 hover:text-orange-600 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors duration-300"
            >
              <img src={assets.basket_icon} alt="Cart" className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {Object.getOwnPropertyNames(cartItems).length}
              </span>
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-300"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-300"
              >
                Sign in
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="px-3">
              <input
                type="search"
                placeholder="Search for food..."
                className="w-full px-3 py-2 rounded-full bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                value={searchValue}
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
