import * as React from 'react';
import Scenario from '../../models/Scenario';
import TragedySet from './TragedySet';
import SelectedPlotList from './SelectedPlotList';
import {Card, CardHeader} from 'material-ui/Card';
import CharacterList from './CharacterList';

interface IProps {
  tragedySetName:string;
  subPlotNum:number;
  selectedPlotList:any;
  selectedCharacterList:any;
};

interface IState {};

class SecretCard extends React.Component<IProps, IState> {
  constructor(public props: IProps) {
    super(props);
  }
  render(): JSX.Element{
    return (
      <Card style={{minWidth:"300px", maxWidth:"500px"}} expanded={true}>
        <CardHeader
          title={`非公開シート`}
          subtitle={this.props.tragedySetName}
        />
        <SelectedPlotList 
          mainPlot={this.props.selectedPlotList.find(plot=>plot.type==='M')} 
          subPlotList={this.props.selectedPlotList.filter(plot=>plot.type==='S').sort((a,b)=>{ a.num > b.num ? 1 : -1})}
          subPlotNum={this.props.subPlotNum}/>
        <CharacterList selectedCharacterList={this.props.selectedCharacterList} />
      </Card>

    );
  }
 }

 export default SecretCard;