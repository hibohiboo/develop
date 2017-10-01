import { connect } from 'react-redux';
import OpenCard from '../components/OpenCard';
import Scenario from '../models/Scenario';

interface IState{
  scenario:Scenario
}

const mapStateToProps = (store:IState, ownProps) => {
  if(!store.scenario){
    return { 
      tragedySetName:''
    }
  }
  const scenario = store.scenario;
  const {selectedSet,numberOfLoops, daysInOneLoop } = scenario;
  const tragedySetName = selectedSet.name;

  return { 
    tragedySetName,
    numberOfLoops,
    daysInOneLoop
  }
}

const OpenCardContainer = connect(
  mapStateToProps
)(OpenCard);

export default OpenCardContainer;