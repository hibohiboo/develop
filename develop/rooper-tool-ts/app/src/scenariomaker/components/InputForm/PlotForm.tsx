import * as React from 'react';
import { Props, Component} from 'react';
import {tragedySetList, TragedySetType} from '../../models/TragedySet';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


interface IRuleProps extends Props<PlotForm>{
  label:string;
  plotList:any
  selectedPlot:any;
  onChange:any;
  num:number;
};
interface IRuleState {};

class Rule extends React.Component<IRuleProps, IState> {

  handleChange = (event, index, value) => {
    const selectedId = parseInt(value, 10);
    const selectedPlot = this.props.plotList.find(plot=>plot.id === selectedId);
    const oldPlotId = this.props.selectedPlot && this.props.selectedPlot.id;
    selectedPlot.num = this.props.num;
    this.props.onChange(selectedPlot, oldPlotId);
  }
  render(): JSX.Element{
    return (
      <SelectField
        floatingLabelText={this.props.label}
        value={this.props.selectedPlot && this.props.selectedPlot.id}
        onChange={this.handleChange}
        autoWidth={true}
      >
        {this.props.plotList.map((plot) =>
          <MenuItem key={plot.id} value={plot.id} label={plot.name}>
            {plot.name}
          </MenuItem>
        )}
      </SelectField>
    );
  }
 }

interface IProps extends Props<PlotForm>{
  mainPlotList:any;
  subPlotLists:any;
  selectedPlotList:any;
  onChange:any;
};
interface IState {};
class PlotForm extends React.Component<IProps, IState> {

  render(): JSX.Element{
    return (
      <div>
        <div>
          <Rule
            label={`ルールY`}
            plotList={this.props.mainPlotList} 
            selectedPlot={this.props.selectedPlotList.find(plot=> plot.type==='M')}
            onChange={this.props.onChange}
            num={0}
            />
        </div>
        {this.props.subPlotLists.map((sub, i)=>
          <div key={`div${i}`}>
            <Rule
              label={`ルールX${i+1}`}
              plotList={sub.subPlotList}
              key={i}
              num={i+1}
              selectedPlot={sub.selectedPlot}
              onChange={this.props.onChange}
              />
          </div>
        )}
        </div>
    );
  }
 }

 export default PlotForm;