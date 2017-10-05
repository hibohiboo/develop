
import * as m from 'mithril';
import { createStore } from 'redux';
import { TragedySet } from '../common/models/TragedySet';
import { requsetTragedySetList } from './actions/tragedySet';
import { get } from './browser/request';
// import InputForm from './components/InputForm';
import TragedySetForm from './components/InputForm/TragedySetForm';
import ITragedySetListItem from './interfaces/ITragedySetListItem';
import store from './store';

const root = document.getElementById('app');
function render() {
  const state = store.getState() as {tragedySetList: TragedySet[]};
  const tragedySetList = state.tragedySetList;
  m.render(root, m(TragedySetForm, { tragedySetList }));
}
store.subscribe(render);
store.dispatch(requsetTragedySetList({ url:'/tragedySets/tragedySetList.json' }));
