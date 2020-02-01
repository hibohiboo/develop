import { createReducer } from '@reduxjs/toolkit';
import { addTodo } from '../actions';
import { Todo } from '../@types';


function initialState(): Todo[] {
  return [];
}

const todos = createReducer(initialState(), builder =>
  builder
    .addCase(addTodo, (state, action) => {
      state.push(action.payload);
    })
);
export default todos;
