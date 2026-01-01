import { Navigate } from "react-router-dom";
import { getRoute } from "./routesConfig";
import { useTenant } from "../hooks/useTenant";

export const TenantRoute = ({ children }) => {
  const { tenant, loading } = useTenant();
  if (loading) return <div>Cargando...</div>;
  if (!tenant) return <Navigate to={getRoute("home").path} replace />; 
  return children;
};