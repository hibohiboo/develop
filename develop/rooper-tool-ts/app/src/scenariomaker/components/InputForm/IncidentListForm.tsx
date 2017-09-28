import * as React from 'react';
import { Props, Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {IIncident} from '../../models/TragedySet';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

interface IProps extends Props<IncidentListForm>{
  incidentList:IIncident[];
  daysInOneLoop:number;
  selectedIncidentList:any;
  unallocateCulpritList:any;
  selectedCharacterList:any;

  onChangeIncident:any;
  onChangeCulprit:any;
}
interface IState {}

const dayColumnStyle={ width:"50px",
                paddingLeft:"10px",
                paddingRight:"10px",
                textAlign:"center"};
                
const columnStyle = {
  width:"120px",
  paddingLeft:"10px"
}

/**
 * 事件フォームの一行
 */
const Row = ( onChangeIncident, 
              incidentList:IIncident[], 
              unallocateCulpritList, 
              day:number, 
              selectedIncidentId:number,
              selectedCulpritId:number,
              onChangeCulprit ) => {
  const handleChange = (event, index, value) => {
      const incidentId = parseInt(value, 10);
      onChangeIncident(day, incidentId);
  };

  const handleChangeCulprit = (event, index, value) => {
      const culpritId = parseInt(value, 10);
      onChangeCulprit(day, culpritId);
  };

  return (
    <TableRow  key={day}>
              <TableRowColumn style={dayColumnStyle}>
                {day}
              </TableRowColumn>
              <TableRowColumn style={columnStyle}>
                <SelectField value={selectedIncidentId}
                             onChange={handleChange}>
                  <MenuItem value={0} label={`事件なし`}>
                    事件なし
                  </MenuItem>
                  {incidentList.map(incident =>
                    <MenuItem key={incident.id} value={incident.id} label={incident.name}>
                      {incident.name}
                    </MenuItem>
                  )}
                </SelectField>
              </TableRowColumn>

              <TableRowColumn style={columnStyle}>
                { !selectedIncidentId ? "" :
                    <SelectField value={selectedCulpritId}
                                 onChange={handleChangeCulprit}>
                      <MenuItem value={0} label={`未選択`}>
                        未選択
                      </MenuItem>
                      {unallocateCulpritList.map(char =>
                        <MenuItem key={char.id} value={char.id} label={char.name}>
                          {char.name}
                        </MenuItem>
                      )}
                    </SelectField>
                }
              </TableRowColumn>
              {// <TableRowColumn>
              //   {!selectedIncidentId ? "" : incidentList.find(incident=>incident.id === selectedIncidentId).effect}
              // </TableRowColumn>
              }
    </TableRow>
  )
};

/**
 * 事件のフォーム
 */
export default class IncidentListForm extends React.Component<IProps, IState> {
  handleToggle = (event, toggled) => {
    const id = parseInt(event.target.value);
  };
  render(): JSX.Element{
    const rows = [];

    // 各行の事件・犯人を作成
    for(let i=0; i<this.props.daysInOneLoop;i++){
      let selectedIncidentId = 0;
      let selectedCulpritId = 0;
      let selectedIncidentEffect = "";
      let culprit = null;
      let unallocateCulpritList = this.props.unallocateCulpritList;
      const incident = this.props.selectedIncidentList.find(incident=>incident.day === i+1);

      if(incident){
        selectedIncidentId = incident.incidentId;
        selectedCulpritId = incident.culpritId || 0;
        culprit = this.props.selectedCharacterList.find(char=>char.id === selectedCulpritId);
        unallocateCulpritList = culprit ? [...unallocateCulpritList, culprit] : unallocateCulpritList;
      }

      rows.push(
        Row(
            this.props.onChangeIncident,
            this.props.incidentList,
            unallocateCulpritList,
            i+1,
            selectedIncidentId,
            selectedCulpritId,
            this.props.onChangeCulprit)
      );
    }

    return (
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={dayColumnStyle}>日数</TableHeaderColumn>
              <TableHeaderColumn style={columnStyle}>事件</TableHeaderColumn>
              <TableHeaderColumn style={columnStyle}>犯人</TableHeaderColumn>
              {// <TableHeaderColumn>効果</TableHeaderColumn>
                }
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {rows}
          </TableBody>
        </Table>
    )
  }
}
