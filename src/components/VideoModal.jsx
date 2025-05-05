/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const VideoModal = ({ video, setSelectedVideo, loading, setLoading }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-4 max-w-3xl w-full relative">
        <button
          onClick={() => setSelectedVideo(null)}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>

        <div className="aspect-video relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 rounded-lg">
              <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
          )}
          <iframe
            src={video.url}
            title={video.title}
            className="w-full h-full rounded-lg"
            allowFullScreen
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>

        <h3 className="text-white mt-4 text-xl font-semibold">{video.title}</h3>
      </div>
    </div>
  );
};

export default VideoModal;
