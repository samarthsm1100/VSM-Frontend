import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to continue.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
