import { createAction } from '@reduxjs/toolkit';

let nextTodoId = 0;
export const addTodo = createAction('ADD_TODO', (text: string) => ({ payload: { id: nextTodoId++, text } }));

// export const addTodoCreator = (text: string) => {
//   const payload = { id: nextTodoId++, text };
//   const creator = createAction('ADD_TODO', withPayloadType<typeof payload>())
//   return creator(payload);
// }

// TypeScript2.8で導入されたReturnTypeで型をかえす
export type AddTodoAction = ReturnType<typeof addTodo>;