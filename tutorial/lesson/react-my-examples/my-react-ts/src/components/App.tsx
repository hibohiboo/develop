import React from "react";
import VisibleTodoList from "../containers/VisibleTodoList";
import AddTodo from "../containers/AddTodo";
const App: React.FC = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
    </div>
  );
};

export default App;
