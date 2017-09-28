import { connect } from 'react-redux';
import Scenario from '../models/Scenario';
import DaysInOneLoopForm from '../components/InputForm/DaysInOneLoopForm';
import {inputDaysInOneLoop} from '../actions';
interface IStateToProps{
  daysInOneLoop:number;
}

interface IDispatchToProps{
  onChange:any;
}

const mapStateToProps = (store):IStateToProps => {
  const scenario:Scenario = store.scenario;
  if(!scenario){
      return {daysInOneLoop:8}
  }

  const {daysInOneLoop} = scenario;

  return {daysInOneLoop};
}

const mapDispatchToProps = (dispatch):IDispatchToProps => {
  return {
    onChange: (daysInOneLoop)=>{
        dispatch(inputDaysInOneLoop(daysInOneLoop));
    }
  }
}

const DaysInOneLoopFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DaysInOneLoopForm);

export default DaysInOneLoopFormContainer;