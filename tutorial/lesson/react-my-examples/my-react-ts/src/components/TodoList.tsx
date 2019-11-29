import React from "react";
import Todo from "./Todo";
import { State } from "../store/todos";

const TodoList: React.FC<State> = props => {
  return (
    <ul>
      {props.todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
