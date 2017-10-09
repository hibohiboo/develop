import { handleActions } from 'redux-actions';
import { ADD } from '../actions';

export class TodoState {
  constructor(
    public id: number,
    public text: string,
  ) {}
}

export default handleActions({
  [ADD]: (state,  { payload }) => {
    return new TodoState(payload.id, payload.text);
  },
},                           new TodoState(0, ''));
