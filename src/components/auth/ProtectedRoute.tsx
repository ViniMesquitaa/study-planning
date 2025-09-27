import { useAuth } from "./../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner de loading
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
