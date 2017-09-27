import * as m from 'mithril';
import { tragedySetList, TragedySetType } from '../../../models/TragedySet';

const TragedySetForm: m.Component<{}, {}> =  {
  view(vnode) {
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
};

// (
//   <SelectField
//     floatingLabelText="惨劇セット"
//     value={this.props.id}
//     onChange={this.handleChange}
//   >
//     {tragedySetList.map((set) =>
//       <MenuItem key={set.id} value={set.id} label={set.name}>
//         {set.name}
//       </MenuItem>
//     )}
//   </SelectField>
// );
export default TragedySetForm;
