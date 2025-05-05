import axios from "axios";

const API_URL = process.env.API || "http://localhost:5000"; 

const axiosInstance = axios.create({
  baseURL: API_URL, 
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
