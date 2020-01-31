import { createReducer } from '@reduxjs/toolkit';
import { addTodo } from "../actions";

function initialState() {
  return { id: 0, text: '' };
}

export const reducer = createReducer(initialState(), builder =>
  builder
    .addCase(addTodo, (state, action) => (action.payload))
);

// const init = initialState();
// const addTodo = addTodoCreator(init.text);
// export const reducer = createReducer(init, {
//   [addTodo.type]: (state, action) => {
//     return action.payload;
//   },
// });
