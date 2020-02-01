import React from "react";
import Todo from "./Todo";
import { useTodoItems } from '../reducers/todos';

const TodoList: React.FC = props => {
  const todos = useTodoItems();
  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;