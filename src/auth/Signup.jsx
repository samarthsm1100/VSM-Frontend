/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../api/axiosInstance"; 
import Lottie from "lottie-react";
import SignupAnimation from "../assets/signup.json";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [googleId, setGoogleId] = useState("");  // Assuming this will be set after Google login
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        mobile,
        password,
        avatar,
        googleId, // You can leave googleId as empty string or null for regular signup
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden px-4">
      
      {/* Glow */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none" />

      {/* Signup Card */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-5xl rounded-xl p-6 bg-white/5 border border-gray-500/20 backdrop-blur-xl shadow-xl">
        
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <Lottie animationData={SignupAnimation} loop={true} />
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
            User Signup
          </h2>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Mobile</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar (Optional)</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Enter avatar URL"
              />
            </div>

            {/* Google ID can be added if you implement Google OAuth */}
            <input
              type="hidden"
              value={googleId}
              onChange={(e) => setGoogleId(e.target.value)} // Optional, for Google OAuth sign-up
            />

            <motion.button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Signup"}
            </motion.button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;