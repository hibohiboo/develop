/**
 * Todoの状態モデル
 *
 * @export
 * @class TodoState
 */
export default class TodoState {
  /**
   * Creates an instance of TodoState.
   * @param {number} id
   * @param {string} text
   * @memberof TodoState
   */
  constructor(
    public id: number,
    public text: string,
  ) {}
}
