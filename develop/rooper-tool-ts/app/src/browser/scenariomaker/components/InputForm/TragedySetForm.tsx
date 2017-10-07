import * as m from 'mithril';
import { tragedySetList, TragedySetType } from '../../../models/TragedySet';

class TragedySetForm implements m.Component<{}, {}> {
  TragedySetForm(vnode) {
  }
  view() {
    return (<div>
             <span>惨劇セット</span>
             <select>
              {
                tragedySetList.map((set) => {
                 return  m('option', { value:set.id }, set.name);
               })
              }
              </select>
            </div>
    );
  }
}
export default TragedySetForm;
