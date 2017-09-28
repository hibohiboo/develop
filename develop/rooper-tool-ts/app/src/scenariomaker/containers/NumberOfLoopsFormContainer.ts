import { connect } from 'react-redux';
import Scenario from '../models/Scenario';
import NumberOfLoopsForm from '../components/InputForm/NumberOfLoopsForm';
import {inputNumberOfLoops} from '../actions';
interface IStateToProps{
  numberOfLoops: number;
}

interface IDispatchToProps{
  onChange:any;
}

const mapStateToProps = (store):IStateToProps => {
  const scenario:Scenario = store.scenario;
  if(!scenario){
      return {numberOfLoops:4}
  }
  const {numberOfLoops} = scenario;

  return {numberOfLoops};
}

const mapDispatchToProps = (dispatch):IDispatchToProps => {
  return {
    onChange: (numberOfLoops: number)=>{
        dispatch(inputNumberOfLoops(numberOfLoops));
    }
  }
}

const NumberOfLoopsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumberOfLoopsForm);

export default NumberOfLoopsFormContainer;