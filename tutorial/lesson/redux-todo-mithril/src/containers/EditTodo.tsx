
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
interface IAttr{}
export default class EditTodo implements  ClassComponent<IAttr> {
  public view(vnode): Vnode<IAttr, HTMLElement> {
    const { text } = vnode.attrs;
    return (
      <div class="editing">
        <label>
          {text}
        </label>
        <input class="edit" value={text} />
      </div>
    );
  }
}