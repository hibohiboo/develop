import { createReducer } from '@reduxjs/toolkit';
import { addTodo } from "../actions";

function initialState() {
  return { id: 0, text: '' };
}

const reducer = createReducer(initialState(), builder =>
  builder
    .addCase(addTodo, (state, action) => (action.payload))
);
export default reducer;
