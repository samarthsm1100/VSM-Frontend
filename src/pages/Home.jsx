/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white bg-[#0a0a0a] overflow-hidden">
      
      {/* Circular Light Glow Effect */}
      <div className="absolute pointer-events-none -top-20 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] bg-blue-500 opacity-20 rounded-full blur-[150px]"></div>

      {/* Grid Overlay */}
      <div className="absolute pointer-events-none inset-0 bg-grid-small opacity-10"></div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mx-4"
      >
        <img src="/icon.png" alt="Vaishali Mali" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg z-10" />
        <p className="text-sm uppercase tracking-wide text-gray-400">Dedicated Science Teacher</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-4">
          Inspiring Students Through <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Science & Innovation
          </span>
        </h1>
        <p className="text-gray-400 mt-4 text-lg md:text-xl font-medium text-center">
          <span className="text-white font-semibold glow-text">Mrs. Vaishali Mali</span> — Teaching with passion for over 17+ years.  
          <br />
          Fluent in Semi-English & Marathi Medium.
        </p>

      </motion.div>

      {/* Call-to-Action Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6"
      >
        <Link
          to="/experience"
          className="inline-block px-6 py-3 border border-gray-600 rounded-full text-gray-300 hover:bg-white hover:text-black transition-all"
        >
          Know about me →
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
