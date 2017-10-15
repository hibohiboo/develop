import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
import AddTodo from '../containers/AddTodo';
import AllCompleted from '../containers/AllCompleted';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';
interface IAttr {}

/**
 * App
 *
 * @export
 * @class App
 * @implements {ClassComponent<IAttr>}
 */
export default class App implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (
    <div>
      <AddTodo />
      <label> check all: <AllCompleted /> </label>
      <VisibleTodoList />
      <Footer />
    </div>);
  }
}
