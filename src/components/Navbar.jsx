/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // adjust this key based on your implementation
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Awards", path: "/awards" },
    { name: "Notes & Lectures", path: "/resources" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  if (!isLoggedIn) {
    navLinks.push({ name: "Login", path: "/login" });
  }

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl z-50">
      <div className="flex items-center justify-between px-6 py-3 bg-opacity-10 backdrop-blur-lg rounded-full border border-gray-600 shadow-lg relative">

        {/* Brand Name */}
        <Link to="/" className="text-lg font-bold mx-auto text-white tracking-wide">
          V. S. Mali
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-white text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "underline decoration-blue-500 underline-offset-4"
                  : "hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-sm text-white font-medium hover:text-red-400 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="w-6 h-6 text-white" /> : <Bars3Icon className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6 text-white text-2xl font-semibold z-50"
          >
            {/* Close Button (Top-Right) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={link.path}
                  className="hover:text-blue-400 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 transition-all"
                >
                  Logout
                </button>
              </motion.div>
            )}

            {/* Close Menu Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 px-6 py-3 bg-gray-800 text-white text-lg rounded-lg shadow-lg hover:bg-gray-700 transition-all"
            >
              Close Menu ✖
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
