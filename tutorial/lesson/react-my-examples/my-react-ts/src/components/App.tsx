import React from "react";
import AddTodo from './AddTodo';
import ToddoList from './TodoList';
import Footer from './Footer';

const App: React.FC = () => {
  return <div>
    <AddTodo />
    <ToddoList />
    <Footer />
  </div>;
};

export default App;