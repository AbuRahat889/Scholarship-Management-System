import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../Contex/AuthProvaider";


const AdminRouts = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = UseAdmin();

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user || isAdmin) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default AdminRouts;
