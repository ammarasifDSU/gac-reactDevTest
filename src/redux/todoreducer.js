import { createSlice } from "@reduxjs/toolkit";
import {
  AddNewTodoApi,
  changeTodoStatusApi,
  deleteTodoApi,
  fetchAlltodosApi,
} from "../apis/todoapis";

const todoReducer = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodoReducer: (state, action) => {
      state.todos.push(action.payload);
      AddNewTodoApi(action.payload);
    },
    setAllTodos: (state, action) => {
      state.todos = action.payload;
    },
    markCompletedTodo: (state, action) => {
      const index = state.todos.findIndex(
        (item) => item.id == action.payload.id
      );
      state.todos[index].completed = action.payload.completed;
      changeTodoStatusApi(action.payload.id, action.payload.completed);
    },
    fetchAllTodosReducer: (state, action) => {},
    deleteTodoReducer: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
      deleteTodoApi(action.payload);
    },
  },
});

export const {
  addTodoReducer,
  fetchAllTodosReducer,
  setAllTodos,
  deleteTodoReducer,
  markCompletedTodo,
} = todoReducer.actions;

export default todoReducer.reducer;
