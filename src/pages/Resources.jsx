/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { videos } from "../data/lectureData";

// Reusable Pagination Component
const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  return (
    <div className="mt-10 mb-6 flex justify-center items-center gap-4 flex-wrap z-10">
      {/* Prev Button */}
      <button
        className={`px-4 py-2 rounded-full font-medium border transition-all duration-300
          ${
            currentPage === 1
              ? "cursor-not-allowed bg-white/5 text-gray-500 border-gray-600"
              : "bg-white/10 text-white hover:bg-white/20 border-white/20"
          }`}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        ⬅ Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2 flex-wrap">
        {generatePages().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
          ) : (
            <button
              key={idx}
              className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 border 
                ${
                  currentPage === page
                    ? "bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg border-transparent scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border-white/10"
                }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-full font-medium border transition-all duration-300
          ${
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
};


const NotesAndLectures = () => {
  const [activeTab, setActiveTab] = useState("lectures");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = window.innerWidth >= 900 ? 9 : 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const indexOfLastVideo = currentPage * itemsPerPage;
  const indexOfFirstVideo = indexOfLastVideo - itemsPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const goToPage = (page) => {
    setCurrentPage(page);
    // window.scrollTo({ top: 0, behavior: "smooth" }); // decide it later
  };

  return (
    <div className="relative min-h-screen px-4 pt-36 bg-[#0a0a0a] text-white flex flex-col items-center overflow-hidden pb-16">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500 opacity-20 rounded-full blur-[150px] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-small opacity-10 z-0 pointer-events-none"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-center z-10"
      >
        Notes & Lectures
      </motion.h2>

      {/* Tabs */}
      <div className="relative mt-10 z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 flex items-center justify-center gap-2 shadow-md">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("lectures")}
            className={`relative px-6 py-2 text-sm md:text-base rounded-full font-semibold transition-all duration-300 flex items-center gap-2 
              ${activeTab === "lectures" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            {activeTab === "lectures" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            🎥 Lectures
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("notes")}
            className={`relative px-6 py-2 text-sm md:text-base rounded-full font-semibold transition-all duration-300 flex items-center gap-2 
              ${activeTab === "notes" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            {activeTab === "notes" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            📘 Notes
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 w-full max-w-6xl z-10">
        {activeTab === "lectures" && (
          <>
            {/* Pagination (Top) */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />

            {/* Videos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentVideos.map((video, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer bg-white/10 backdrop-blur-lg border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg"
                  onClick={() => {
                    setSelectedVideo(video);
                    setLoading(true);
                    document.getElementById("video_modal").showModal();
                  }}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-md w-full mb-3"
                  />
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                </motion.div>
              ))}
            </div>

            {/* Pagination (Bottom) */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </>
        )}

        {activeTab === "notes" && (
          <div className="text-center text-gray-400 text-lg mt-10">
            📚 Notes feature coming soon... Admins will be able to upload and manage notes here.
          </div>
        )}
      </div>

      {/* Modal */}
      <dialog id="video_modal" className="modal">
        <div className="modal-box w-full max-w-6xl bg-[#1a1a1a] border border-gray-700 relative p-0 overflow-hidden rounded-xl">
          <form method="dialog" className="absolute right-4 top-4 z-20">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
          </form>

          <div className="aspect-video w-full">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 rounded-lg">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
              </div>
            )}
            {selectedVideo && (
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
                onLoad={() => setLoading(false)}
              ></iframe>
            )}
          </div>

          <div className="px-6 py-4">
            <h3 className="text-white text-xl font-semibold">
              {selectedVideo?.title}
            </h3>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NotesAndLectures;
