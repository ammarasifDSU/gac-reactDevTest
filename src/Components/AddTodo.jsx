import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoReducer } from "../redux/todoreducer";
import "../styles/todos.css";
import { fetchCategoriesApi } from "../apis/categoryapis";

const AddTodo = () => {
  const [newTodoValue, setNewTodoValue] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoriesApi().then((res) => {
      if (res.data && res.data.length > 0) {
        setCategory(res.data);
        setSelectedCategory(res.data[0]);
      }
    });
  }, []);

  const handleOnChangeTodo = (e) => {
    setNewTodoValue(e.target.value);
  };

  const submitNewTodo = () => {
    if (newTodoValue != "" && selectedCategory) {
      let newTodo = {
        id: Math.random().toString(16).slice(2),
        completed: false,
        name: newTodoValue,
        categoryId: selectedCategory.id,
        category: selectedCategory.name,
      };
      setNewTodoValue("");
      let firstId = category[0].id;
      setSelectedCategory(firstId);
      dispatch(addTodoReducer(newTodo));
    }
  };

  const handleCategory = (e) => {
    const selectedId = e.target.value;
    const selectedOption = category.find((cat) => cat.id == selectedId);
    setSelectedCategory(selectedOption);
  };

  return (
    <div>
      <fieldset>
        <legend>Add Your Todos Here</legend>
        <input
          className="input-todo"
          value={newTodoValue}
          onChange={handleOnChangeTodo}
          type="text"
          placeholder="Type Todo here"
        />
        <select
          onChange={handleCategory}
          value={selectedCategory?.id}
          className="select-category"
        >
          {category?.map((val, key) => (
            <option value={val.id} key={key}>
              {val.name}
            </option>
          ))}
        </select>
      </fieldset>
      <button className="btn-addtodo" onClick={submitNewTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
