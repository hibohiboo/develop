import * as React from 'react';
import { Props, Component} from 'react';
import {tragedySetList, TragedySetType} from '../../models/TragedySet';
import {CharacterType} from '../../models/Character';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

interface IRoleProps extends Props<RoleListForm>{
  roleList:any;
  onChange:any;
  characterId:number;
  selectedKey:number;
};
interface IState {};

export default class RoleListForm extends React.Component<IRoleProps, IState> {

  handleChange = (event, index, value) => {
    const selectedKey = parseInt(value, 10);
    this.props.onChange(selectedKey, this.props.characterId);
  }
  render(): JSX.Element{
    return (
      <SelectField
        // floatingLabelText={this.props.label}
        value={this.props.selectedKey}
        onChange={this.handleChange}
      >
        <MenuItem value={0} label={`パーソン`}>
          パーソン
        </MenuItem>
        {this.props.roleList.map((role, index) =>
          <MenuItem key={role.key} value={role.key} label={role.name}>
            {role.name}
          </MenuItem>
        )}
      </SelectField>
    );
  }
 }


interface IIllegulerRoleProps extends Props<IllegulerRoleListForm>{
  roleList:any;
  onChange:any;
  selectedKey:number;
};

export class IllegulerRoleListForm extends React.Component<IIllegulerRoleProps, IState> {

  handleChange = (event, index, value) => {
    const selectedKey = parseInt(value, 10);
    this.props.onChange(selectedKey, CharacterType.mysteryBoy);
  }
  render(): JSX.Element{
    return (
      <SelectField
        value={this.props.selectedKey}
        onChange={this.handleChange}
      >
        {this.props.roleList.map((role, index) =>
          <MenuItem key={role.key} value={role.key} label={role.name}>
            {role.name}
          </MenuItem>
        )}
      </SelectField>
    );
  }
 }
