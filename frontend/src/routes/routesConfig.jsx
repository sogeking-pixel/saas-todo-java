import AccessDenied from "../pages/errors/AcessDenied";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todo from "../pages/Todo";
import Home from "../pages/Home"

export const freeRoutes = [
  {
    name: "denegado",
    path: "/denegado",
    element: <AccessDenied />,
  },
  {
    name: "home",
    path: "/",
    element: <Home/>
  }
];

export const publicRoutes = [
  {
    name: "login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "register",
    path: "/register",
    element: <Register />,
  },
];

export const protectedRoutes = [
  {
    name: "todo",
    path: "/todo",
    element: <Todo />,
    roles: ["na"],
  },
];

export function getRoute(name) {
  const allRoutes = [...freeRoutes, ...publicRoutes, ...protectedRoutes];
  const route = allRoutes.find((r) => r.name === name);
  return route ? route : null;
}
