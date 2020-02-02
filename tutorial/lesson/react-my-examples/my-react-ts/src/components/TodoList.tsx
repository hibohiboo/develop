import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../actions";
import Todo from "./Todo";
import { useTodoItems } from '../reducers/todos';

const TodoList: React.FC = props => {
  const todos = useTodoItems();
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map(todo => <Todo key={todo.id} {...todo} toggle={() => dispatch(toggleTodo(todo.id))} />)}
    </ul>
  );
};

export default TodoList;