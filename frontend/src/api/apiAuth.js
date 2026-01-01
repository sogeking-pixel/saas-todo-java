import axiosPublic from "./axios/axiosPublic";
import axiosPrivate from "./axios/axiosPrivate";

export const urlLogin = () => "/auth/login";
export const urlRegister = () => "/auth/register";
export const urlLogout = () => "/auth/logout";
export const urlMe = () => "/user/me";

export const postLogin = (credentials) => axiosPublic.post(urlLogin(), credentials);
export const postRegister = (userData) => axiosPublic.post(urlRegister(), userData);
export const postLogout = (refresh) => axiosPrivate.post(urlLogout(), { refresh });
export const getMe = () => axiosPrivate.get(urlMe());
