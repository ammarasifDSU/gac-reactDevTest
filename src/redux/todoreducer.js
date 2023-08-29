import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewTodoAndFetchAll,
  changeTodoStatusApi,
  deleteTodoApi,
  fetchAllTodos,
} from "../apis/todoapis";



const todoReducer = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    markCompletedTodo: (state, action) => {
      const index = state.todos.findIndex(
        (item) => item.id == action.payload.id
      );
      state.todos[index].completed = action.payload.completed;
      changeTodoStatusApi(action.payload.id, action.payload.completed);
    },
    deleteTodoReducer: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
      deleteTodoApi(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(addNewTodoAndFetchAll.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const {
  deleteTodoReducer,
  markCompletedTodo,
} = todoReducer.actions;

export default todoReducer.reducer;
