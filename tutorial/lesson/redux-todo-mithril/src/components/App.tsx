import * as m from 'mithril';  
/**
 * ハローワールド
 * 
 * @export
 * @class App
 */
export default class App {

  /**
   * 必須。 mithrilコンポーネントを返す
   * 
   * @param {any} vnode 
   * @returns 
   * @memberof App
   */
  public view(vnode) {
    return (<div> Hello World!!! mithril {m.version} </div>);
  }
}
