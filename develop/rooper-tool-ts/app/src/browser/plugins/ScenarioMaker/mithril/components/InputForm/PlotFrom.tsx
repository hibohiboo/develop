import * as m from 'mithril';
import { TragedySetType } from '../../../common/models/TragedySet';

class Rule extends m.Component<{}, {}> {
  // handleChange = (event, index, value) => {
  //   const selectedId = parseInt(value, 10);
  //   const selectedPlot = this.props.plotList.find(plot=>plot.id === selectedId);
  //   const oldPlotId = this.props.selectedPlot && this.props.selectedPlot.id;
  //   selectedPlot.num = this.props.num;
  //   this.props.onChange(selectedPlot, oldPlotId);
  // }
  render(vnode): Element{
    const {plotList} = vnode.attrs;
    return (
      <select
        //floatingLabelText={this.props.label}
        //value={this.props.selectedPlot && this.props.selectedPlot.id}
        //onChange={this.handleChange}
        //uautoWidth={true}
      >
        {plotList.map((plot) =>
          <option value={plot.id} label={plot.name}>
            {plot.name}
          </option>
        )}
      </select>
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