
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { connect } from '../mithril-redux';
import { addTodo } from '../actions';

interface IAttr {}

function mapDispatchToProps(dispatch){
  return {
    onClick(text: string){
      dispatch(addTodo(text))
    }
  }
}

interface IDispatch {
  onClick(text: string): void;
}

class _AddTodo implements  ClassComponent<IAttr> {
  private value:string;
  view(vnode){
    const {onClick} = vnode.attrs.props;
    return (
      <div>
        <input 
          oninput={m.withAttr("value", value=>this.value = value)} 
          value={this.value}
        />
        <button
          onclick={
            () => {
              onClick(this.value);
              this.value = '';
            }
          }
        >
          Add Todo
        </button>
      </div>
    );
}
};

export default connect(null, mapDispatchToProps)(_AddTodo);

