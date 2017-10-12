import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports

interface IAttr {
  text: string;
  completed: boolean ;
}

export default class Todo implements  ClassComponent<IAttr> {
  /**
   *
   * @param vnode
   */
  public view({attrs}: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { text, completed } = attrs;
    return (
    <li style = {{ textDecoration: completed ? 'line-through' : 'none' }}>
      {text}
    </li>);
  }
}
