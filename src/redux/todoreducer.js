import { createSlice } from "@reduxjs/toolkit";
import { AddNewTodoApi, deleteTodoApi, fetchAlltodosApi } from "../apis/todoapis";


const todoReducer = createSlice({
    name:"todo",
    initialState:{
        todos:[]
    },
    reducers:{
        addTodoReducer:(state,action)=>{
            state.todos.push(action.payload)
            AddNewTodoApi(action.payload)
        },
        setAllTodos:(state,action)=>{
            state.todos = action.payload
        },
        markCompletedTodo:(state,action)=>{
            // state.todos[action.payload.id].status = action.payload.status
            changeTodoStatusApi(action.payload.id,action.payload.status)
        },
        fetchAllTodosReducer:(state,action)=>{
            //  fetchAlltodosApi().then(res=>{
            //     state.todos = [...res.data]
            //  })
             //state.todos= data
        },
        deleteTodoReducer:(state,action)=>{
            state.todos = state.todos.filter((todo)=>todo.id != action.payload)
            deleteTodoApi(action.payload)
        }
    }
})

export const {addTodoReducer,fetchAllTodosReducer,setAllTodos,deleteTodoReducer,markCompletedTodo} = todoReducer.actions

export default todoReducer.reducer