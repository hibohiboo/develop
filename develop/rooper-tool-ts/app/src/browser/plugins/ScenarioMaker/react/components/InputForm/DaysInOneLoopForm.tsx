import * as React from 'react';
import {Props, Component} from 'react';
import TextField from 'material-ui/TextField';

interface IProps extends Props<DaysInOneLoopForm>{
  daysInOneLoop:number;
  onChange:any;
}
interface IState {}

export default class DaysInOneLoopForm extends React.Component<IProps, IState> {
  handleChange = (event) => {
    const daysInOneLoop = parseInt(event.target.value);
    this.props.onChange(daysInOneLoop);
  };
  render(): JSX.Element{
    return (
        <TextField floatingLabelText={"1ループ日数"}
                   type={"number"} 
                   value={this.props.daysInOneLoop}
                   style={{width:"100px"}}
                   onChange={this.handleChange}
                    />
    )
  }
 }
