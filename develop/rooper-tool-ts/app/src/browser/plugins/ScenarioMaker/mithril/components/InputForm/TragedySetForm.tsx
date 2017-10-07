import * as m from 'mithril';
import { TragedySetType } from '../../../common/models/TragedySet';

class TragedySetForm implements m.Component<{}, {}> {
  view(vnode) {
    console.log('form')
    console.log(vnode)
    const {tragedySetList} = vnode.attrs.props;

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
