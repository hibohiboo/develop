/**
 * Todoの状態モデル
 *
 * @export
 * @class TodoState
 */
export class TodoState {
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
