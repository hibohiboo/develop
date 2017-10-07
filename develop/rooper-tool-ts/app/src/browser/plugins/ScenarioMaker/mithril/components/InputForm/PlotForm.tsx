import * as m from 'mithril';
import { TragedySetType } from '../../../common/models/TragedySet';

class Rule implements m.Component<{}, {}> {
  view(vnode): Element{
    const {plotList, label} = vnode.attrs;
    return (
      <div>
        <h2>{label}</h2>
        rule:{plotList}
      </div>
    );
  }
 }

class PlotForm implements m.Component<{}, {}> {
  view(){
    return m(
      'div',
      [
        m('h2', 'PlotFrom'),
        m('Rule',{label:`ルールY`, plotList:'plotlist'}) 
      ]
    );
  }
 }

 export default PlotForm;