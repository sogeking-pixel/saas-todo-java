// src/components/Register.js
import React from "react";
import CardForm from "../components/CardForm";
import { getRoute } from "../routes/routesConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingIcon from "../components/LoadingIcon";


export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      dni: formData.get("dni"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setLoading(true);
    setError(null);

    try {
      const res = await register(userData);
      if (!res.success) throw new Error(res.message || "Registration failed");
      navigate(getRoute("login").path);
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
          Crear una Cuenta
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
              placeholder="username"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              Nombres
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nombres"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Apellidos
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Apellidos"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="tu@correo.com"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="dni"
              className="text-sm font-medium text-gray-700"
            >
              DNI
            </label>
            <input
              id="dni"
              name="dni"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="DNI"
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
              placeholder="********"
              disabled={loading}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading && <LoadingIcon size={18} />}
              Registrarse
            </button>
          </div>
          <div className="text-sm text-center">
            Ya tienes una cuenta?{" "}
            <a
              href={getRoute("login").path}
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Ingresa aquí
            </a>
          </div>
        </form>
      </CardForm>
    </div>
  );
}
