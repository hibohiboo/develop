import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
interface IAttr {}
export default class Link implements  ClassComponent<IAttr> {
  view({children}: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (<a href="#">{children}</a>);
  }
}