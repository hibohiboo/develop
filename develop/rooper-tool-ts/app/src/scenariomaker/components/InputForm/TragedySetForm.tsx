import * as React from 'react';
import { Props, Component} from 'react';
import {tragedySetList, TragedySetType} from '../../models/TragedySet';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

interface IProps extends Props<TragedySetForm>{
  id: TragedySetType;
  onChange: any; 
};
interface IState {};

class TragedySetForm extends React.Component<IProps, IState> {
  constructor(public props: IProps) {
    super(props);
  }
  /**
   * 選択された値をintに変換してreducerに渡す
   */
  handleChange = (event, index, value) => {
    const selectedId = parseInt(value, 10);
    this.props.onChange(selectedId);
  }
  render(): JSX.Element{
    return (
      <SelectField
        floatingLabelText="惨劇セット"
        value={this.props.id}
        onChange={this.handleChange}
      >
        {tragedySetList.map((set) =>
          <MenuItem key={set.id} value={set.id} label={set.name}>
            {set.name}
          </MenuItem>
        )}
      </SelectField>
    );
  }
 }

 export default TragedySetForm;