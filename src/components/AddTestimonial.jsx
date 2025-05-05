/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../api/axiosInstance";

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    role: "",
    description: "",
    date: "",
  });

  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = getCurrentDate();
    const dataWithDate = { ...formData, date };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.image);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("date", date);
      
      await axios.post("/api/form/add/", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Submitted data:", dataWithDate);
      toast.success("✅ Testimonial added successfully!");

      setFormData({
        image: null,
        name: "",
        role: "",
        description: "",
        date: "",
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="relative min-h-screen px-4 pt-36 pb-20 bg-[#0a0a0a] text-white flex flex-col items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500 opacity-20 rounded-full blur-[150px] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-small opacity-10 z-0 pointer-events-none" />

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text z-10">
        Add Testimonial
      </h2>

      {/* Form */}
      <form
        className="mt-10 z-10 bg-white/5 border border-white/20 p-10 rounded-2xl backdrop-blur-sm w-full max-w-2xl shadow-xl space-y-8"
      >
        {/* Image Upload */}
        <div className="flex flex-col items-center gap-3">
          <label htmlFor="image" className="text-lg text-gray-300 font-medium mb-1">
            Upload Photo <span className="text-red-400">*</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-sm file-input-bordered w-full max-w-xs bg-white/10 text-white border border-white/20 hover:border-blue-500 hover:bg-white/20 transition"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border border-white/30 mt-2"
            />
          )}
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-lg text-gray-300 font-medium">Name</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-base"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-lg text-gray-300 font-medium">Your Role</label>
          <select
            required
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-base appearance-none"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select</option>
            <option value="current student">Current Student</option>
            <option value="former student">Former Student</option>
            <option value="parent">Parent</option>
            <option value="colleague">Colleague</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-lg text-gray-300 font-medium">Your Message</label>
          <textarea
            required
            rows={5}
            placeholder="Write your testimonial..."
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none text-base"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.image}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-full transition duration-300 shadow-xl text-lg ${
              formData.image
                ? "bg-gradient-to-tr from-blue-500 to-purple-600 text-white border border-white/20 hover:scale-105"
                : "bg-white/10 text-gray-400 cursor-not-allowed border border-white/10"
            }`}
          >
            🚀 Submit Testimonial
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestimonial;
