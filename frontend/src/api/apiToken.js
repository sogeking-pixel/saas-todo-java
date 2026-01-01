import axiosPublic from "./axios/axiosPublic";

export const urlTokenRefresh = () => "/auth/token/refresh";

export const postTokenRefresh = (refresh) => axiosPublic.post(urlTokenRefresh(), { refresh });


