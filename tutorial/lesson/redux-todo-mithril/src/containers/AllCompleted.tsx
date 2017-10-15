
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { addTodo } from '../actions/todos';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';
interface IAttr {
  props: {
    completed: boolean;
  };
}

const mapStateToProps = (store: {todos: TodoState[]}): {completed: boolean} => {
  return { completed: store.todos.every(todo => todo.completed) };
};

class AllCompleted implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, {}>) {
    const { completed } = vnode.attrs.props;
    return (
      <input class="toggle" type="checkbox" checked={completed} />
    );
  }
}

export default connect(mapStateToProps, null)(AllCompleted);
