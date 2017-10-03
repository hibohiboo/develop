
import * as m from 'mithril';
import { TragedySetType } from '../common/models/TragedySet';
import { get } from './browser/request';
// import InputForm from './components/InputForm';
import TragedySetForm from './components/InputForm/TragedySetForm';
import ITragedySetListItem from './interfaces/ITragedySetListItem';

(async () => {
  const tragedySetList: ITragedySetListItem[] = await get('/tragedySets/tragedySetList.json');
  const root = document.getElementById('app');
  m.render(root, m(TragedySetForm, { tragedySetList }));
})();
