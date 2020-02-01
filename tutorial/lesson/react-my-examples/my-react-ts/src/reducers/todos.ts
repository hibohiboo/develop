import { createReducer } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { addTodo, toggleTodo } from '../actions';
import { ITodo } from '../@types';

function initialState(): ITodo[] {
  return [];
}

const todos = createReducer(initialState(), builder =>
  builder
    .addCase(addTodo, (state, action) => {
      state.push(
        {
          completed: false,
          ...action.payload,
        });
    })
    .addCase(toggleTodo, (state, { payload }) => state.map(todo => ({ ...todo, completed: todo.id === payload ? !todo.completed : todo.completed })))
);
export default todos;

export const useTodoItems = () => {
  return useSelector((state: { todos: ReturnType<typeof todos> }) => state.todos);
}
