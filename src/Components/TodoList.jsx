import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../styles/todos.css"
import { deleteTodoReducer, fetchAllTodosReducer, markCompletedTodo, setAllTodos } from '../redux/todoreducer'
import { fetchAlltodosApi } from '../apis/todoapis'

const TodoList = () => {
    const {todos} = useSelector(state=>state.todo)
    const dispatch = useDispatch()
    
    useEffect(()=>{
       //dispatch(fetchAllTodosReducer())
       fetchAlltodosApi().then(res=>{
        dispatch(setAllTodos(res.data))
       })
    },[])

    const deleteItem = (e,id)=>{
      dispatch(deleteTodoReducer(id))
    }

    const changeStatus = (id,status)=>
    {
      dispatch(markCompletedTodo(id,status))
    }
  return (
    <div>
        <ul className='todos'>
      {todos?.map((val,key)=>(
        <li className='todo-items' key={key}>{val.name}
        <span>
        <label className='delete-btn' onClick={e=>deleteItem(e,val.id)}> X </label>
        <input className='todo-checkbox' onClick={e=>changeStatus(val.id,val.status)} type='checkbox' checked={val.status}/>
        
        </span>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default TodoList
