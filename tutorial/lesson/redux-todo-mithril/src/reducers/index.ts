import { handleActions } from 'redux-actions';
import { ADD } from '../actions';
import { TodoState } from '../models/TodoState';

export default handleActions({
  [ADD]: (state,  { payload }) => {
    return new TodoState(payload.id, payload.text);
  },
},                           new TodoState(0, ''));
