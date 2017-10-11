import * as m from 'mithril';
// tslint:disable-next-line: no-duplicate-imports
import { ClassComponent, Vnode } from 'mithril';
import VisibleTodoList from '../containers/VisibleTodoList';
import AddTodo from '../containers/AddTodo';

interface IAttr {}

/**
 * App
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
    return (
    <div>
      <AddTodo />
      <VisibleTodoList />
    </div>);
  }
}
