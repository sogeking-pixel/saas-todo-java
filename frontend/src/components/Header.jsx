import React from "react";
import Logo from "./Logo";
import { getRoute } from "../routes/routesConfig";

export default function Header({ user, onLogout }) {
  const getInitials = (name) => {
    if (!name) return "?";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <a
            href={getRoute("todo").path}
            className="flex items-center space-x-2"
          >
            <Logo />
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              "ToDo Fast"
            </span>
          </a>

          {/* Sección del Usuario */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
                {getInitials(user?.firstName || "Usuario")}
              </div>
              <span className="text-gray-700 font-medium hidden md:block">
                Hola, {user?.firstName || "Usuario"}
              </span>
            </div>

            {/* Botón de Cerrar Sesión con Icono */}
            <button
              onClick={onLogout}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              title="Cerrar Sesión"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
