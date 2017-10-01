import * as React from 'react';
import Scenario from '../../models/Scenario';
import {Card, CardHeader} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


interface IProps {
  tragedySetName:string;
  numberOfLoops:number;
  daysInOneLoop:number;
};

interface IState {};

class OpenCard extends React.Component<IProps, IState> {
  constructor(public props: IProps) {
    super(props);
  }
  render(): JSX.Element{
    return (
      <Card style={{minWidth:"300px", maxWidth:"500px"}}>
        <CardHeader
          title={`公開シート`}
          subtitle={this.props.tragedySetName}
        />
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                ループ回数
              </TableHeaderColumn>
              <TableRowColumn>
                {this.props.numberOfLoops}
              </TableRowColumn>
              <TableHeaderColumn>
                1ループ日数
              </TableHeaderColumn>
              <TableRowColumn>
                {this.props.daysInOneLoop}
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  }
 }

 export default OpenCard;