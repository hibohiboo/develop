// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state, action) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // 新しいstateを返す
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    // TOGGLE_TODO_の時、
    // actionCreatorに渡したidと一致するtodoのcompletedを反転
    // Object.assignで現在のstateと、completedを書き換えたstateを結合
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })
    // それ以外のときはstateを変化させない
    default:
      return state
  }
}

// 複数のtodoを保持できるよう拡張
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // ...演算子でstateの要素を展開。
      // ex) [todo1, todo2, todo(undefined, action)]
      return [
        ...state,
        todo(undefined, action)
      ]
    // map関数を使って現在のtodosに格納されているすべてのtodoをtodo reducerに渡す
    case 'TOGGLE_TODO':
      return state.map((t) =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos