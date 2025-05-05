/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Import your API call or fetch function
import axios from "../api/axiosInstance"; // Adjust the path to your axios instance
// import { getTestimonialsFromDatabase } from "../api"; // Make sure to adjust the path
import avatarMale from "../assets/avatar-male.png";
import avatarFemale from "../assets/avatar-female.png";

// Pagination Component
const Pagination = ({ currentPage, totalPages, goToPage }) => (
  <div className="mt-10 mb-6 flex justify-center items-center gap-4 flex-wrap z-10">
    <button
      className={`px-4 py-2 rounded-full font-medium border transition-all duration-300 ${
        currentPage === 1
          ? "cursor-not-allowed bg-white/5 text-gray-500 border-gray-600"
          : "bg-white/10 text-white hover:bg-white/20 border-white/20"
      }`}
      disabled={currentPage === 1}
      onClick={() => goToPage(currentPage - 1)}
    >
      ⬅ Previous
    </button>

    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 border ${
            currentPage === idx + 1
              ? "bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg border-transparent scale-105"
              : "bg-white/10 text-gray-300 hover:bg-white/20 border-white/10"
          }`}
          onClick={() => goToPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
    </div>

    <button
      className={`px-4 py-2 rounded-full font-medium border transition-all duration-300 ${
        currentPage === totalPages
          ? "cursor-not-allowed bg-white/5 text-gray-500 border-gray-600"
          : "bg-white/10 text-white hover:bg-white/20 border-white/20"
      }`}
      disabled={currentPage === totalPages}
      onClick={() => goToPage(currentPage + 1)}
    >
      Next ➡
    </button>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // Will store testimonials fetched from DB
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Carousel Animation Logic
  const carouselRef = useRef(null);
  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await axios.get("/api/form/testimonials"); 
      setTestimonials(response.data); 
    };
    fetchTestimonials();

    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen px-4 pt-30 bg-[#0a0a0a] text-white flex flex-col items-center overflow-hidden pb-16">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-500 opacity-20 rounded-full blur-[150px] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-small opacity-10 z-0 pointer-events-none"></div>

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text z-10"
      >
        Testimonials
      </motion.h2>

      {/* Add Testimonial Button */}
        <div className="z-10">
          <button
            className="mt-10 z-10 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-lg transform hover:scale-105 transition duration-300"
          >
            <Link to="/add-testimonial">✍️ Add Testimonial</Link>
          </button>
        </div>

      {/* Show No Testimonials Available message if no testimonials */}
      {testimonials.length === 0 ? (
        <p className="text-xl text-center mt-8">No Testimonials Available</p>
      ) : (
        <>
          {/* Carousel */}
          <div
            ref={carouselRef}
            className="mt-8 flex gap-8 overflow-x-auto no-scrollbar w-full max-w-6xl px-4 py-6 z-10"
          >
            {testimonials.slice(0, 5).map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="max-w-[300px] md:min-w-[450px] md:max-w-[450px] py-8 bg-white/10 p-6 rounded-xl border border-white/20 shadow-md flex-shrink-0 cursor-pointer"
                onClick={() => setSelected(t)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={t.imageUrl || (t.gender === "female" ? avatarFemale : avatarMale)}
                    alt={t.name}
                    className="w-24 h-24 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-semibold text-xl">{t.name}</h4>
                    <p className="text-md text-gray-400">{t.title}</p>
                  </div>
                </div>
                <p className="text-md text-gray-300 line-clamp-4">{t.description.slice(0, 120) + (t.description.length > 120 ? "...." : "")}</p>
                <p className="mt-3 text-xs text-gray-500">{t.date}</p>
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          {testimonials.length > itemsPerPage && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-10 z-10 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-lg transform hover:scale-105 transition duration-300"
            >
              {showAll ? "▲ Show Less" : "▼ Show More"}
            </button>
          )}

          {/* Expanded Testimonials Grid */}
          {showAll && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl z-10">
                {currentTestimonials.map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelected(t)}
                    className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm shadow-md cursor-pointer transition hover:scale-[1.03]"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={t.imageUrl || (t.gender === "female" ? avatarFemale : avatarMale)}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <p className="text-sm text-gray-400">{t.title}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-3">{t.description.slice(0, 90)}....</p>
                    <p className="mt-3 text-xs text-gray-500">{t.date}</p>
                  </div>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            </>
          )}
        </>
      )}

      {/* Modal */}
      <dialog id="testimonial_modal" className="modal" open={!!selected}>
        <div className="modal-box bg-[#1a1a1a] border border-gray-700 max-w-3xl w-full">
          <form method="dialog" className="absolute right-4 top-4">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
          </form>

          {selected && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selected.imageUrl || (selected.gender === "female" ? avatarFemale : avatarMale)}
                  alt={selected.name}
                  className="w-16 h-16 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{selected.date}</p>
                </div>
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{selected.description}</p>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Testimonials;
