const uniqueId = (() => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
})();

/**
 * Todoの状態モデル
 *
 * @export
 * @class TodoState
 */
export default class TodoState {
  public id: number;
  public text: string;
  public completed: boolean = false;
  public editing: boolean = false;
  /**
   *
   * @param id
   * @param text
   * @param completed
   */
  constructor(data) {
    this.id = uniqueId();
    this.text = data.text;
    this.completed = data.completed || false;
    this.editing = data.editing || false;
  }
}
