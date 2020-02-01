import { createAction } from '@reduxjs/toolkit';

let nextTodoId = 0;
export const addTodo = createAction('ADD_TODO', (text: string) => ({ payload: { id: nextTodoId++, text } }));
export const toggleTodo = createAction('TOGGLE_TODO', (id: number) => ({ payload: id }));
