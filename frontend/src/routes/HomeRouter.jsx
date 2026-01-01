import { Navigate } from "react-router-dom";
import { useTenant } from "../hooks/useTenant";
import { getRoute } from "./routesConfig"; // Asumo que tienes esto

export const HomeRouter = ({ children }) => {
  const { tenant, loading } = useTenant();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (tenant) {
    return <Navigate to={getRoute("todo").path} replace />;
  }

  return children;
};
