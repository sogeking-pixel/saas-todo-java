// src/components/Login.js
import React from "react";
import CardForm from "../components/CardForm";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";

import { getRoute } from "../routes/routesConfig";
import { useAuth } from "../hooks/useAuth";

export default function Login() {  
  const { login } = useAuth();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    setLoading(true);
    setError(null);

    try {
      const res = await login(credentials);
      if (!res.success) throw new Error(res.message || "Login failed");
      navigate(getRoute("todo").path);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CardForm className={"w-full max-w-md"}>
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Iniciar Sesión
        </h2>
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="todouser"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="*********"
              disabled={loading}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <LoadingIcon size={18} />}
              Ingresar
            </button>
          </div>
          <div className="text-sm text-center">
            No tienes cuenta?{" "}
            <a
              href={getRoute("register").path}
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Regístrate aquí
            </a>
          </div>
        </form>
      </CardForm>
    </div>
  );
}
