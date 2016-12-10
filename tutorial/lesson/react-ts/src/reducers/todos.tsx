import { AddTodoAction } from '../actions';

export class TodoState {
  constructor(
    public id: number,
    public text: string
  ){}
}

// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state:any, action: AddTodoAction) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // 新しいTodoStateを返す
    case 'ADD_TODO':
      return new TodoState(action.id, action.text);
    // それ以外のときはstateを変化させない
    default:
      return state
  }
};

const todos = (state: TodoState[] = [], action: AddTodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    default:
      return state
  }
};

export default todos;