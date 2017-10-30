
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { connect } from '../mithril-redux';
import { editingTodo } from '../actions/todos';
import TodoState from '../models/TodoState';
interface IAttr{}

interface IOwnProps {
  id:number;
  text: string;
}

const mapStateToProps = (store, { text}: IOwnProps) => {
  return { text };
};


const mapDispatchToProps = (dispatch, {id}: IOwnProps) => {
  return {
    onDoubleClick() {
      dispatch(editingTodo(id));
    },
  };
}

class EditTodoComponent implements  ClassComponent<IAttr> {
  public view(vnode): Vnode<IAttr, HTMLElement> {
    const { text, onDoubleClick } = vnode.attrs.props;

    return (
      <div>
        <label ondblclick={onDoubleClick}>
          {text}
        </label>
        <input class="edit" value={text} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoComponent);