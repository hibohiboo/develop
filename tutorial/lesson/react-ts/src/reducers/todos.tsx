import { TodoActions } from '../actions';
import TodoState from '../states/TodoState';

// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state?:TodoState, action?: TodoActions) => {
  switch (action.type) {
    case 'ADD_TODO':
      return new TodoState(action.id, action.text);
    case 'TOGGLE_TODO':
      // actionCreatorに渡したidと一致するtodoのみ処理
      if (state.id !== action.id) {
        return state
      }
      // completedだけを反転
      return new TodoState(state.id, state.text, !state.completed);
    // それ以外のときはstateを変化させない
    default:
      return state
  }
};

const todos = (state: TodoState[] = [], action: TodoActions) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map((t) =>
        todo(t, action)
      );
    default:
      return state
  }
};

export default todos;