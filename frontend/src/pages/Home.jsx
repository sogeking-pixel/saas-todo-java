import React from "react";
import { Link } from "react-router-dom"; 
import { getRoute } from "../routes/routesConfig";

function Home() {
  const loginPath = getRoute("login").path;
  const registerPath = getRoute("register").path;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="my-8 text-4xl font-extrabold text-gray-900 tracking-tight">
            Bienvenido
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            La mejor plataforma para gestionar tus tareas de forma eficiente y
            segura.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to={loginPath}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg transition duration-150 ease-in-out shadow-sm"
          >
            Iniciar Sesión
          </Link>

          <Link
            to={registerPath}
            className="w-full flex items-center justify-center px-4 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg transition duration-150 ease-in-out"
          >
            Crear cuenta nueva
          </Link>
        </div>

        <p className="mt-2 text-center text-sm text-gray-400">
          v1.0.0 - Powered by Spring Boot
        </p>
      </div>
    </div>
  );
}

export default Home;
