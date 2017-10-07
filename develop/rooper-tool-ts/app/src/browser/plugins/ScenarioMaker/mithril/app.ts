
import * as m from 'mithril';
import { createStore } from 'redux';
import { TragedySet } from '../common/models/TragedySet';
import { requsetTragedySetList } from './actions/tragedySet';
import { get } from './browser/request';
// import InputForm from './components/InputForm';
import TragedySetForm from './components/InputForm/TragedySetForm';
import ITragedySetListItem from './interfaces/ITragedySetListItem';
import store from './store';
import InputForm from './components/InputForm';
import Provider from './mithril-redux';

class App implements m.Component<{}, {}> {
  public props;
  view(vnode): Element{
    console.log(vnode)
    console.log('app')
    console.log(this)
    const state = vnode.attrs.props.state as {tragedySetList: TragedySet[]};    
    const tragedySetList = state.tragedySetList;
    return m('div',[
      m(TragedySetForm, { tragedySetList }),
      m(InputForm)
    ]);
  }
 }


const root = document.getElementById('app');
function render() {
  m.render(root, m(Provider,{store}, App));
}

// subscribeによって、dispatchのたびにrenderが呼ばれる。
store.subscribe(render);
store.dispatch(requsetTragedySetList({ url:'/tragedySets/tragedySetList.json' }));
