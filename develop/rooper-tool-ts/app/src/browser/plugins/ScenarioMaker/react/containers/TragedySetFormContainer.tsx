import * as React from 'react';
import { connect } from 'react-redux';
import TragedySetForm from '../components/InputForm/TragedySetForm';
import { selectTragedySet  } from '../actions/index';
import { getTragedySet } from '../services/TragedySetService';
import { TragedySetType, TragedySet } from '../models/TragedySet';

interface IState{}

interface IProps{}

interface IStateToProps{
  id: TragedySetType;
}

interface IDispatchToProps{
  onChange: any
}

const mapStateToProps = (store):IStateToProps => {
  let id = TragedySetType.basic;
  if(store.scenario && store.scenario.selectedSet){
    id = store.scenario.selectedSet.id; 
  }

  return { 
    id
  }
}

const mapDispatchToProps = (dispatch):IDispatchToProps => {
  return {
    onChange: (id:TragedySetType = TragedySetType.basic) => {
      (async ()=>{
        const set = await getTragedySet(id);
        dispatch(selectTragedySet(set));
      })();
    }
  }
}

const TragedySetFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TragedySetForm);

export default TragedySetFormContainer;