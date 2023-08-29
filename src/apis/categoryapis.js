import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const baseurl = VITE_BASE_URL;

export const fetchCategoriesApi = () => {
  return axios.get(`${baseurl}/category`);
};
