
import * as m from 'mithril';
import { ClassComponent, Vnode, VnodeDOM } from 'mithril'; // tslint:disable-line: no-duplicate-imports max-line-length
import { doneEditingTodo, editingTodo } from '../actions/todos';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';

interface IOwnProps {
  id: number;
  text: string;
  editing: boolean;
}

interface IProps extends IOwnProps {
  onDoubleClick: () => void;
  onBlur: (text: string) => void;
}

interface IAttr {
  props: IProps;
}

const mapStateToProps = (store, { text, editing }: IOwnProps) => {
  return { text, editing };
};
const mapDispatchToProps = (dispatch, { id }: IOwnProps) => {
  return {
    onDoubleClick() {
      dispatch(editingTodo(id));
    },
    onBlur(text: string) {
      dispatch(doneEditingTodo(id, text));
    },
  };
};

class EditTodoComponent implements  ClassComponent<IAttr> {
  private value: string;

  public view(vnode: Vnode<IAttr, this>) {
    const { onDoubleClick, onBlur, text, editing } = vnode.attrs.props;
    this.value = text;
    const cancelEditing = () => {
      this.value = text;
      onBlur(text);
    };
    const doneEditing = () => {
      const val = this.value;
      if (val === '') {
        return cancelEditing();
      }
      this.value = '';
      onBlur(val);
    };

    return (
      <div>
        <label ondblclick={onDoubleClick}>
          {text}
        </label>
        <input
          className="edit"
          value={this.value}
          onupdate={
            (node: VnodeDOM<{}, this>) => {
              if (editing) {
                const element = node.dom as HTMLElement;
                element.focus();
              }
            }
          }
          oninput={m.withAttr('value', value => this.value = value)}
          onblur={doneEditing}
          onkeyup={
            (e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                doneEditing();
              } else if (e.key === 'Escape') {
                cancelEditing();
              }
            }
          }
          />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoComponent);
