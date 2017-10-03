
import * as m from 'mithril';
// import InputForm from './components/InputForm';
import TragedySetForm from './components/InputForm/TragedySetForm';
import {TragedySetType} from '../common/models/TragedySet';

const tragedySetList = [
  { id:TragedySetType.first,    name: `First Steps`,   fileName: `firstSteps.json` },
  { id:TragedySetType.basic,    name: `Basic Tragedy`, fileName: `basicTragedy.json` },
  { id:TragedySetType.midnight, name: `Midnight Zone`, fileName: `midnightZone.json` },
  { id:TragedySetType.mystery,  name: `Mystery Circle`,   fileName: `mysteryCircle.json` },
  { id:TragedySetType.haunted,  name: `Haunted Stage`, fileName: `hauntedStage.json` },
];

const root = document.getElementById('app');
//m.render(root, m(InputForm));
m.render(root, m(TragedySetForm, {tragedySetList}));