import { createAction } from 'redux-actions';

export const GET_REQUEST = 'TODO_LIST_GET_REQUESTED';
export const getRequsetTodoList = createAction(GET_REQUEST);

export const GET_FAILED = 'TODO_LIST_GET_FAILED';
export const getFailureTodoList = createAction(GET_FAILED, message => message);

export const GET_SUCCESS = 'TODO_LIST_GET_SUCCEEDED';
export const getSuccessTodoList = createAction(GET_SUCCESS, todoList => ({ todoList }));

export const PUT_REQUEST = 'TODO_LIST_PUT_REQUESTED';
export const putRequsetTodoList = createAction(PUT_REQUEST, todoList => ({ todoList }));

export const PUT_FAILED = 'TODO_LIST_PUT_FAILED';
export const putFailureTodoList = createAction(PUT_FAILED, message => message);

export const PUT_SUCCESS = 'TODO_LIST_PUT_SUCCEEDED';
export const putSuccessTodoList = createAction(PUT_SUCCESS, todoList => ({ todoList }));
