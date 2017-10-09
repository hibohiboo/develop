import * as m from 'mithril';
// tslint:disable-next-line: no-duplicate-imports
import { ClassComponent, Vnode } from 'mithril';

interface IAttr {}

/**
 * ハローワールド
 *
 * @export
 * @class App
 * @implements {ClassComponent<IAttr>}
 */
export default class App implements  ClassComponent<IAttr> {

  /**
   *
   * @param vnode
   */
  public view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (<div> Hello World!!! mithril</div>);
  }
}
