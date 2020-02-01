import { createReducer } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { addTodo } from '../actions';
import { ITodo } from '../@types';

function initialState(): ITodo[] {
  return [];
}

const todos = createReducer(initialState(), builder =>
  builder
    .addCase(addTodo, (state, action) => {
      state.push(
        {
          completed: true,
          ...action.payload,
        });
    })
);
export default todos;

export const useTodoItems = () => {
  return useSelector((state: { todos: ReturnType<typeof todos> }) => state.todos);
}
