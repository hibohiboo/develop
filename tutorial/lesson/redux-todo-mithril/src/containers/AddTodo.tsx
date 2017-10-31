
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { addTodo } from '../actions/todos';
import { connect } from '../mithril-redux';

interface IAttr {}

function mapDispatchToProps(dispatch) {
  return {
    onClick(text: string) {
      dispatch(addTodo(text));
    },
  };
}

interface IDispatch {
  onClick(text: string): void;
}

class AddTodoComponent implements  ClassComponent<IAttr> {
  private value: string;
  public view(vnode) {
    const { onClick } = vnode.attrs.props;
    return (
      <div>
        <input
          className="toggle"
          oninput={m.withAttr('value', value => this.value = value)}
          value={this.value}
        />
        <button
          onclick={
            () => {
              const val = this.value;
              this.value = '';
              onClick(val); // dispatchのタイミングで画面が更新される。
            }
          }
        >
          Add Todo
        </button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddTodoComponent);
