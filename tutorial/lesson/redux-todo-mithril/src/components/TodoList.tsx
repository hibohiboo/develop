import * as m from 'mithril';
// tslint:disable-next-line: no-duplicate-imports
import { ClassComponent, Vnode } from 'mithril';
import TodoState from '../models/TodoState';
import Todo from './Todo';

interface IAttr {
  props: {
    todos: TodoState[],
  };
}

/**
 * Todoのリストを返す
 *
 * @export
 * @class TodoList
 * @implements {ClassComponent<IAttr>}
 */
export default class TodoList implements  ClassComponent<IAttr> {

  public view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { todos } = vnode.attrs.props;
    return (
<ul>
  {todos.map(todo => <Todo {...todo} />)}
</ul>);
  }
}
