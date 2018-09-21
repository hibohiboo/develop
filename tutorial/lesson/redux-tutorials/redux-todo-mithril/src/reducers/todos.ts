import { handleActions } from 'redux-actions';
import { GET_SUCCESS, PUT_SUCCESS } from '../actions/storage';
import TodoState from '../models/TodoState';

export default handleActions({
  [GET_SUCCESS]: (state: TodoState[],  { payload: { todoList } }: any) => {
    return todoList.map(todo => new TodoState(todo));
  },
  [PUT_SUCCESS]: (state: TodoState[],  { payload: { todoList } }: any) => {
    return todoList;
  },
},                           []);
