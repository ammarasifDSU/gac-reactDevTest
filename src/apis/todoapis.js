import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const { VITE_BASE_URL } = import.meta.env;

const baseurl = VITE_BASE_URL;


export const fetchAllTodos = createAsyncThunk('todos/fetchAll', async () => {
    const response = await axios.get(`${baseurl}/task`);
    return response.data;
  });

  export const addNewTodoAndFetchAll = createAsyncThunk(
    'todos/addNewAndFetchAll',
    async (newTodo, { getState }) => {
      await axios.post(`${baseurl}/task`, newTodo);
  
      const response = await axios.get(`${baseurl}/task`);
      return response.data;
    }
  );
export const deleteTodoApi = (id) => {
  return axios.delete(`${baseurl}/task/${id}`);
};

export const changeTodoStatusApi = (id, completed) => {
  return axios.put(`${baseurl}/task/${id}`, { completed });
};
