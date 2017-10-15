import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports

interface IAttr {
  text: string;
  completed: boolean;
  onClick: (id: number) => void;
}

export default class Todo implements  ClassComponent<IAttr> {
  /**
   *
   * @param vnode
   */
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { text, completed, onClick } = attrs;
    const classes = completed ? 'completed' : '';
    return (
    <li class={classes}>
      <input class="toggle" type="checkbox" onclick={onClick} checked={completed} />
      <label>{text}</label>
    </li>);
  }
}
