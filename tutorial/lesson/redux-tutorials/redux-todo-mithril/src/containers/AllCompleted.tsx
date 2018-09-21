
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';
import { allCompleted, allIncompleted } from '../modules/allCompoeted';
interface IAttr {
  props: {
    completed: boolean;
    onClick: (completed: boolean) => void;
  };
}

const mapStateToProps = (store: {todos: TodoState[]}): {completed: boolean} => {
  return { completed: store.todos.every(todo => todo.completed) };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (completed: boolean) => {
      if (completed) {
        dispatch(allIncompleted());
        return;
      }
      dispatch(allCompleted());
    },
  };
};

class AllCompleted implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, this>) {
    const { completed, onClick } = vnode.attrs.props;
    return (
      <input className="toggle"
             type="checkbox"
             onclick={() => onClick(completed)}
             checked={completed} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCompleted);
