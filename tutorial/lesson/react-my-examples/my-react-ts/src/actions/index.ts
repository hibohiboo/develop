import { Action } from "redux";

// TypeScript3.4で導入された const assertion を利用することで各定数がstringではなく、その文字列の型として定義される
const ADD_TODO = "ADD_TODO" as const;

let nextTodoId = 0;

// actionを発行する関数
export const addTodo = (text: string) => {
  // actionはtypeを持つオブジェクト
  // この場合、アクションタイプはADD_TODO
  // データはpayloadとなる。
  return {
    type: ADD_TODO,
    payload: {
      id: nextTodoId++,
      text
    }
  };
};

// TypeScript2.8で導入されたReturnTypeで型をかえす
export type AddTodoAction = ReturnType<typeof addTodo> & Action<string>;
