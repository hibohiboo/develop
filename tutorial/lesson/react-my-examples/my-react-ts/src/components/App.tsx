import React from "react";
import AddTodo from './AddTodo';
import ToddoList from './TodoList';

const App: React.FC = () => {
  return <div>
    <AddTodo />
    <ToddoList />
  </div>;
};

export default App;