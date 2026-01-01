import axiosPrivate from "./axios/axiosPrivate";

const API_URL = "/tasks";

export const getTasks = async () => {
  const response = await axiosPrivate.get(API_URL);
  return response.data;
}
export const createTask = async (taskData) => {
  const response = await axiosPrivate.post(API_URL, taskData);
  return response.data;
}
export const updateTask = async (taskId, taskData) => {
  const response = await axiosPrivate.put(`${API_URL}/${taskId}`, taskData);
  return response.data;
}
export const deleteTask = async (taskId) => {
  const response = await axiosPrivate.delete(`${API_URL}/${taskId}`);
  return response.data;
}
export const getTaskById = async (taskId) => {
  const response = await axiosPrivate.get(`${API_URL}/${taskId}`);
  return response.data;
}