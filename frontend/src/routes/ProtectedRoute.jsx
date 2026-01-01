import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getRoute } from "./routesConfig";
import { useContext } from "react";

export const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to={getRoute("login").path} replace />;
  return roles.includes(user.rol || "na") ? (
    children
  ) : (
    <Navigate to={getRoute("denegado").path} />
  );
};