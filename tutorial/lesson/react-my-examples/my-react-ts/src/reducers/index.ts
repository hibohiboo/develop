import produce, { Draft } from "immer";
import { AddTodoAction } from "../actions";

export class TodoState {
  constructor(public id: number, public text: string) {}
}

const todo = produce((draft: Draft<TodoState>, action: AddTodoAction) => {
  switch (action.type) {
    // actionTypeがADD_TODOのとき、
    // 新しいTodoStateを返す
    case "ADD_TODO":
      // es6の分割代入でpayloadからidとtextを取り出す
      const {
        payload: { id, text }
      } = action;
      draft.id = id;
      draft.text = text;

    // それ以外のときはstateを変化させない。何もしないproduceは、元の状態を返す。
    // default:
    //   return draft;
  }
});

export default todo;
