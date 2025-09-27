import { useAuth } from "./../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
