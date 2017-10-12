import { handleActions } from 'redux-actions';
import { ADD, IAddTodoAction, IToggleTodoAction, TOGGLE } from '../actions';
import TodoState from '../models/TodoState';

export default handleActions({
  [ADD]: (state: TodoState[],  { payload }: IAddTodoAction) => {
    return [...state, new TodoState(payload.id, payload.text)];
  },
  [TOGGLE]: (state: TodoState[] ,{ payload }: IToggleTodoAction) => {
    const { id } = payload;
    return state.map((t) => {
      // actionCreatorに渡したidと一致するtodoのみ処理
      if (t.id !== id) {
        return t;
      }
      // completedだけを反転
      return  new TodoState(t.id, t.text, !t.completed);
    });
  },
},                           []);
