
import * as m from 'mithril';
import { createStore } from 'redux';
import { TragedySet } from '../common/models/TragedySet';
import { requsetTragedySetList } from './actions/tragedySet';
import { get } from './browser/request';
import InputForm from './components/InputForm';
// import InputForm from './components/InputForm';
// import TragedySetForm from './components/InputForm/TragedySetForm';
import TragedySetFormContainer from './containers/TragedySetFormContainer';
import ITragedySetListItem from './interfaces/ITragedySetListItem';
import Provider from './mithril-redux';
import store from './store';

/**
 * アプリケーションコンテナ。
 *
 * @class App
 * @implements {m.Component<{}, {}>}
 */
class App implements m.Component<{}, {}> {
  public view(vnode): Element {
    return m('div',[
      m(TragedySetFormContainer),
      m(InputForm),
    ]);
  }
}

const root = document.getElementById('app');
function render() {
  m.render(root, m(Provider,{ store }, App));
}

// subscribeによって、dispatchのたびにrenderが呼ばれる。
store.subscribe(render);
store.dispatch(requsetTragedySetList({ url:'/tragedySets/tragedySetList.json' }));
