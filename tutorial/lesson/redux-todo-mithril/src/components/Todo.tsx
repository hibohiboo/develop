import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports
import TodoState from '../models/TodoState';
import DeleteTodo from '../containers/DeleteTodo';
import EditTodo from '../containers/EditTodo';

interface IAttr extends TodoState {
  onClick: (id: number) => void;
}

export default class Todo implements  ClassComponent<IAttr> {
  /**
   *
   * @param vnode
   */
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { id, text, completed, editing, onClick } = attrs;
    const classes = ( completed ? 'completed ' : '') + 
                    ( editing   ? 'editing '   : '');
    return (
    <li class={classes}>
      <div class="view">
        <input class="toggle" type="checkbox" onclick={onClick} checked={completed} />
        <EditTodo text={text} id={id} />
        <DeleteTodo id={id} />
      </div>
    </li>);
  }
}
