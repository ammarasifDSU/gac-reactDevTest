import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoReducer } from '../redux/todoreducer'
import "../styles/todos.css"

const AddTodo = () => {

    const [newTodoValue,setNewTodoValue] = useState("")
    const dispatch = useDispatch()

    const handleOnChangeTodo = (e) => {
        setNewTodoValue(e.target.value)
    }

    const submitNewTodo = () =>{
        if(newTodoValue != ""){
          let newTodo= {
            id: Math.floor(Math.random()).toString(),
            completed:false,
            name:newTodoValue,
            categoryId:0
          }
        dispatch(addTodoReducer(newTodo))
        }
    }

  return (
    <div>
      <fieldset>
        <legend>Add Your Todos Here</legend>
        <input className='input-todo' onChange={handleOnChangeTodo} type='text' placeholder='Type Todo here'/>
        <button className='btn-addtodo' onClick={submitNewTodo}>Add Todo</button>
      </fieldset>
    </div>
  )
}

export default AddTodo
