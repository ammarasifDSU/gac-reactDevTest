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

    const changeStatus = (id,completed)=>
    {
      let obj = {id,completed}
      dispatch(markCompletedTodo(obj))
    }
  return (
    <div >
       <h3>Todo List</h3>
       <div className="frame">
        <ul className='todos'>
      {todos?.map((val,key)=>(
        <li className='todo-items' key={key}>
          <span className="todo-name">{val.name}</span>
          <input className='todo-checkbox' onClick={e=>changeStatus(val.id,!val.completed)} type='checkbox' checked={val.completed}/>
        <button className="remove-button" onClick={e=>deleteItem(e,val.id)}>
              &#10005;
            </button>
       
    
        </li>
      ))}
      </ul>
      </div>
    </div>
  )
}

export default TodoList
