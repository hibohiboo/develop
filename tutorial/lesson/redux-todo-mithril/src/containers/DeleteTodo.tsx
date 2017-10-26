
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { deleteTodo } from '../actions/todos';
import { connect } from '../mithril-redux';

interface IAttr {
  props: {
    active: boolean;
    filter: string;
  };
}

interface IOwnProps {
  id:number;
}

const mapStateToProps = (state, {id}: IOwnProps) => {
  return {id};
};


function mapDispatchToProps(dispatch) {
  return {
    onClick(id: number) {
      dispatch(deleteTodo(id));
    },
  };
}

class DeleteTodoComponent implements  ClassComponent<IAttr> {
  public view(vnode): Vnode<IAttr, HTMLElement> {
    const { onClick, id } = vnode.attrs.props;
    return (
      <button  class="destroy" 
          onclick={
            () => onClick(id)
          }
        >
          x
        </button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTodoComponent);
