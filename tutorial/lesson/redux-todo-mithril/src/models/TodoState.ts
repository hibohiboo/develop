/**
 * Todoの状態モデル
 *
 * @export
 * @class TodoState
 */
export default class TodoState {
  /**
   *
   * @param id
   * @param text
   * @param completed
   */
  constructor(
    public id: number,
    public text: string,
    public completed: boolean = true, // TODO: true -> false
  ) {}
}
