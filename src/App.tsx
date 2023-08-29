import "./App.css";
import AddTodo from "./Components/AddTodo.jsx"
import TodoList from "./Components/TodoList.jsx"

function App() {
  return (
    <>
      <div>
        <h1>Todo app</h1>
        <AddTodo/>
        <TodoList/>
      </div>
    </>
  );
}

export default App;
