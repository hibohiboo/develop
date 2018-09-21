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

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

// フィルターを受け取ってそれを返す
//    SHOW_ALL: 全部表示
//    SHOW_COMPLETED: 完了しているtodoのみ
//    SHOW_ACTIVE: 完了していないtodoのみ

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}