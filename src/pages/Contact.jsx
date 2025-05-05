/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_vsm',           
      'template_1r2ona8',      
      e.target,
      '7k0xQUqNrHSE-dhdt'     
    )
    .then(() => {
      toast.success('Message sent!');
      e.target.reset();
    })
    .catch(() => toast.error('Something went wrong.'));
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] px-4 pt-36 flex flex-col items-center justify-center text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-full bg-blue-500 opacity-20 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-small opacity-10 z-0 pointer-events-none"></div>

      {/* Contact Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Contact Me
        </h2>
        <p className="text-gray-400 mt-2 text-lg">Let's connect and discuss your queries!</p>
      </motion.div>

      {/* Contact Section (Form + Map) */}
      <div className="mt-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">
        
        {/* Contact Form (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full md:w-1/2 border border-gray-700"
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-gray-300">Message</label>
              <textarea
                rows="4"
                name="message"
                className="w-full bg-transparent border border-gray-600 px-3 py-2 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Map Section (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full md:w-1/2 flex flex-col items-center text-center"
        >
          <h3 className="text-xl font-semibold text-gray-300 mb-3">
            Find Me at My Workplace
          </h3>
          <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg border border-gray-600">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.69097981781!2d74.5970258752025!3d17.03882128379016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc13fda1c89d3e1%3A0x2ab67cf7b050be99!2sVidyaniketan%2C%20Somwar%20Peth%2C%20Tasgaon%2C%20Maharashtra%20416312!5e0!3m2!1sen!2sin!4v1743775319092!5m2!1sen!2sin" 
              className="w-full h-full border-0"
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Or reach me at:</p>
        <p className="text-blue-400">vaishalisunil1100@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;
