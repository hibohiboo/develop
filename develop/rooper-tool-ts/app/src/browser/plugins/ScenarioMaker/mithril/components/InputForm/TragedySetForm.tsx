import * as m from 'mithril';
import { TragedySetType } from '../../../common/models/TragedySet';

class TragedySetForm implements m.Component<{}, {}> {
  view(vnode) {
    const {tragedySetList} = vnode.attrs;

    return (
    <div>
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