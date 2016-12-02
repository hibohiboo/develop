let nextTodoId = 0;
// actionを発行する関数
export const addTodo = (text) => {
  // actionはtypeを持つオブジェクト
  // この場合、アクションタイプはADD_TODO
  // データはidとtextとなる。
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}