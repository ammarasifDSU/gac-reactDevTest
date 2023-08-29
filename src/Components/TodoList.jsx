import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/todos.css";
import {
  deleteTodoReducer,
  fetchAllTodosReducer,
  markCompletedTodo,
  setAllTodos,
} from "../redux/todoreducer";
import { fetchAlltodosApi } from "../apis/todoapis";
import { fetchCategoriesApi } from "../apis/categoryapis";

const TodoList = () => {
  const { todos } = useSelector((state) => state.todo);
  const [displayTodos, setDisplayTodos] = useState(todos);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    fetchAlltodosApi().then((res) => {
      dispatch(setAllTodos(res.data));
      setDisplayTodos(res.data);
    });

    fetchCategoriesApi().then((res) => {
      if (res.data && res.data.length > 0) {
        let data = [...res.data];
        data.unshift({ id: "0", name: "All" });
        setCategory(data);
        setSelectedCategory(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    setDisplayTodos(todos);
  }, [todos]);

  const deleteItem = (e, id) => {
    let firstId = category[0].id;
    setSelectedCategory(firstId);
    dispatch(deleteTodoReducer(id));
  };

  const changeStatus = (id, completed) => {
    let obj = { id, completed };
    dispatch(markCompletedTodo(obj));
  };

  const handleCategory = (e) => {
    const selectedId = e.target.value;
    const selectedOption = category.find((cat) => cat.id == selectedId);
    let todosOrg = [...todos];

    if (selectedId == 0) {
      setDisplayTodos(todosOrg);
    } else {
      let filterCatTodos = todosOrg.filter(
        (val) => val.category == selectedOption.name
      );
      setDisplayTodos(filterCatTodos);
    }
    setSelectedCategory(selectedId);
  };

  return (
    <div>
      <h3>Todo List</h3>
      <div className="frame">
        {todos.length == 0 ? (
          <h2>No Todo added yet!</h2>
        ) : (
          <>
            <span>
              <span>Filter: </span>
              <select
                onChange={handleCategory}
                value={selectedCategory}
                className="select-category"
              >
                {category?.map((val, key) => (
                  <option value={val.id} key={key}>
                    {val.name}
                  </option>
                ))}
              </select>
            </span>
            <ul className="todos">
              {displayTodos?.map((val, key) => (
                <li className="todo-items" key={key}>
                  <span className="todo-name">
                    {val.name} - {val.category}
                  </span>
                  <input
                    className="todo-checkbox"
                    onChange={(e) => changeStatus(val.id, !val.completed)}
                    type="checkbox"
                    checked={val.completed}
                  />
                  <button
                    className="remove-button"
                    onClick={(e) => deleteItem(e, val.id)}
                  >
                    &#10005;
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
