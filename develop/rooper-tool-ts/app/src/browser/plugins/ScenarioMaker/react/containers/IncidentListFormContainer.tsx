import * as React from 'react';
import { connect } from 'react-redux';
import IncidentListForm from '../components/InputForm/IncidentListForm';
import {Scenario} from '../models/Scenario';
import {IIncident} from '../models/TragedySet';
import { selectIncident, selectCulprit  } from '../actions';
interface IState{}

interface IProps{}

interface IStateToProps{
  incidentList:IIncident[];
  daysInOneLoop:number;
  selectedIncidentList;
  unallocateCulpritList;
  selectedCharacterList;
}

interface IDispatchToProps{
  onChangeIncident:any;
  onChangeCulprit:any;
}

/**
 * まだ選択されていない役職一覧を作成。
 */
const mapStateToProps = (store):IStateToProps => {
  const scenario:Scenario = store.scenario;
  if(!scenario){
      return { 
        incidentList:[],
        daysInOneLoop:0,
        selectedIncidentList:[],
        unallocateCulpritList:[],
        selectedCharacterList:[]
    }
  }
  const {incidentList} = scenario.selectedSet;
  const {daysInOneLoop, selectedIncidentList, unallocateCulpritList, selectedCharacterList} = scenario;
  return {
            incidentList,
            selectedIncidentList,
            daysInOneLoop,
            unallocateCulpritList,
            selectedCharacterList
          };
}

const mapDispatchToProps = (dispatch):IDispatchToProps => {
  return {
    onChangeIncident: (day, incidentId)=>{
       dispatch(selectIncident(day, incidentId));
    },
    onChangeCulprit: (day, culpritId)=>{
      dispatch(selectCulprit(day, culpritId));
    }
  }
}

const IncidentListFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidentListForm);

export default IncidentListFormContainer;