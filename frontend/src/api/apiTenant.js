import axiosPublic from "./axios/axiosPublic";

export const urlTenant = () => "/config-site/";

export const getTenant = () =>
  axiosPublic.get( urlTenant());
