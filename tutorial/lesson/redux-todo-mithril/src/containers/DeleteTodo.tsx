
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { deleteTodo } from '../actions/todos';
import { connect } from '../mithril-redux';

interface IAttr {
  props: {
    onClick: ()=>void;
  };
}

interface IOwnProps {
  id:number;
}

function mapDispatchToProps(dispatch, {id}: IOwnProps) {
  return {
    onClick() {
      dispatch(deleteTodo(id));
    },
  };
}

class DeleteTodoComponent implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, this>) {
    const { onClick } = vnode.attrs.props;
    return (
      <button  className="destroy" onclick={onClick}></button>
    );
  }
}

export default connect(null, mapDispatchToProps)(DeleteTodoComponent);
