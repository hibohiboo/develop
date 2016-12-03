// 現在のstateとactionを受け取り、新しいstateを返す関数
const todo = (state, action) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // { id: action.id, text: action.text }
    // という新しいstateを返す
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text
      }
    // それ以外のときはstateを変化させない
    default:
      return state
  }
}
export default todo