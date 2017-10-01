import * as React from 'react';
import { Props, Component} from 'react';
import {ICharacterWithRole} from '../../models/Scenario';
import {CharacterType} from '../../models/Character';
import RoleListForm from './RoleListForm';
import IllegulerRoleListFormContainer from '../../containers/IllegulerRoleListFormContainer';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
// import MobileTearSheet from '../ui/MobileTearSheet';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

interface IProps extends Props<CharacterListForm>{
  characterWithRoleList:ICharacterWithRole[];
  unallocatedRoleList:any;
  onToggle:any;
  onChange:any;
}
interface IState {}

export default class CharacterListForm extends React.Component<IProps, IState> {
  handleToggle = (event, toggled) => {
    const id = parseInt(event.target.value);
    this.props.onToggle(id);
  };
  render(): JSX.Element{
    var useColumnStyle={ width:"50px",
                         paddingLeft:"10px",
                         paddingRight:"10px",
                         textAlign:"center"};
    var characterColumnStyle = {
      width:"120px"
    }
    return (
      // <MobileTearSheet>
        <Table selectable={false} height={`300px`}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={useColumnStyle}>使用</TableHeaderColumn>
              <TableHeaderColumn style={characterColumnStyle}>人物</TableHeaderColumn>
              <TableHeaderColumn>役職</TableHeaderColumn>
              <TableHeaderColumn>備考</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {this.props.characterWithRoleList.map(char =>{
                return <TableRow  key={char.id}>
                          <TableRowColumn  style={useColumnStyle}>
                            <Toggle defaultToggled={char.selected} value={char.id} onToggle={this.handleToggle} />
                          </TableRowColumn>
                          <TableRowColumn style={characterColumnStyle}>{char.name}</TableRowColumn>
                          <TableRowColumn>
                            {char.selected && char.id !== CharacterType.mysteryBoy ?
                               <RoleListForm selectedKey={char.role && char.role.key || 0} 
                                              characterId={char.id} 
                                              onChange={this.props.onChange} 
                                              roleList={char.role ? [...this.props.unallocatedRoleList, char.role] :
                                                                    this.props.unallocatedRoleList} /> : ``}
                            {char.selected && char.id === CharacterType.mysteryBoy ? <IllegulerRoleListFormContainer /> : ``}
                          </TableRowColumn>  
                        </TableRow>
              }
            )}
          </TableBody>
        </Table>
      // </MobileTearSheet>
    )
  }
 }
        // <List>
        //     {
        //       this.props.characterList.map(char =>{
        //         return <ListItem  key={char.id} 
        //                           rightToggle={<Toggle defaultToggled={char.selected} value={char.id} onToggle={this.handleToggle} />}
        //                 >
        //                 {char.name}
   
        //                 </ListItem>
        //       }
        //     )}
        // </List>