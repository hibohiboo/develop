import { createAction } from '@reduxjs/toolkit';

// 重複をなくすためのサポート関数
function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const addTodo = createAction('ADD_TODO', withPayloadType<string>());

// export const addTodoCreator = (text: string) => {
//   const payload = { id: nextTodoId++, text };
//   const creator = createAction('ADD_TODO', withPayloadType<typeof payload>())
//   return creator(payload);
// }

// TypeScript2.8で導入されたReturnTypeで型をかえす
export type AddTodoAction = ReturnType<typeof addTodo>;