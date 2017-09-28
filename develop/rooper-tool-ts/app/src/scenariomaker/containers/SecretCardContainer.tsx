import { connect } from 'react-redux';
import SecretCard from '../components/SecretCard';
import Scenario from '../models/Scenario';

interface IState{
  scenario:Scenario
}

const mapStateToProps = (store:IState, ownProps) => {
  if(!store.scenario){
    return { 
      tragedySetName:'',
      selectedPlotList:[],
      subPlotNum:2,
      selectedCharacterList:[]
    }
  }
  const scenario = store.scenario;
  const {selectedSet, selectedPlotList, characterList, selectedRoleList, characterRoleList, selectedCharacterList } = scenario;
  const tragedySetName = selectedSet.name;
  const subPlotNum = selectedSet.subplotNum;

  return { 
    tragedySetName,
    selectedPlotList,
    subPlotNum,
    selectedCharacterList
  }
}

const SecretCardContainer = connect(
  mapStateToProps
)(SecretCard);

export default SecretCardContainer;