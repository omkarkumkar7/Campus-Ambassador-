// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  // Wait for auth to initialize before deciding
  if (loading) {
    return null; // Or a loading spinner
  }

  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;
