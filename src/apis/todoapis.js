import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const baseurl = VITE_BASE_URL;

export const AddNewTodoApi = (data) => {
  return axios.post(`${baseurl}/task`, data);
};

export const fetchAlltodosApi = () => {
  return axios.get(`${baseurl}/task`);
};

export const deleteTodoApi = (id) => {
  return axios.delete(`${baseurl}/task/${id}`);
};

export const changeTodoStatusApi = (id, completed) => {
  return axios.put(`${baseurl}/task/${id}`, { completed });
};
