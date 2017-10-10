import { handleActions } from 'redux-actions';
import { ADD, IAddTodoAction } from '../actions';
import TodoState from '../models/TodoState';

export default handleActions({
  [ADD]: (state: TodoState[],  { payload }: IAddTodoAction) => {
    return [...state, new TodoState(payload.id, payload.text)];
  },
},                           []);
