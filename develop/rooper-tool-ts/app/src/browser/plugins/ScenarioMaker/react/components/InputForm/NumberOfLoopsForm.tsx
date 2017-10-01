import * as React from 'react';
import {Props, Component} from 'react';
import TextField from 'material-ui/TextField';

interface IProps extends Props<DaysInOneLoopForm>{
  numberOfLoops:number;
  onChange:any;
}
interface IState {}

export default class DaysInOneLoopForm extends React.Component<IProps, IState> {
  handleChange = (event) => {
    const numberOfLoops = parseInt(event.target.value);
    this.props.onChange(numberOfLoops);
  };
  render(): JSX.Element{
    return (
        <TextField floatingLabelText={"ループ数"}
                   type={"number"} 
                   value={this.props.numberOfLoops}
                   style={{width:"100px"}}
                   onChange={this.handleChange}
                    />
    )
  }
 }
