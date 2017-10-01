import * as React from 'react';
import { connect } from 'react-redux';
import PlotForm from '../components/InputForm/PlotForm';
import { selectPlot  } from '../actions/index';
import Scenario from '../models/Scenario';
import {Plot, SelectedPlot} from '../models/Plot';

interface IState{}

interface IProps{}

interface IStateToProps{
  mainPlotList:Plot[];
  subPlotLists:any;
  selectedPlotList:SelectedPlot[];
}

interface IDispatchToProps{
  onChange: any
}

const mapStateToProps = (store):IStateToProps => {
  const scenario:Scenario = store.scenario;
  if(!scenario || !scenario.selectedSet){
      return { 
        mainPlotList:[],
        subPlotLists:[],
        selectedPlotList:[]
    }
  }

  const selectedSet = scenario.selectedSet;
  const plotList = selectedSet.plotList;
  const mainPlotList = plotList.filter(plot=>plot.type==='M');;
  const selectedPlotList = scenario.selectedPlotList;

  let subPlotLists = [];

  // 選択されていないルールXのリストを作成
  const subPlotList = plotList.filter(plot=>plot.type==='S' && selectedPlotList.findIndex(sp=>sp.id === plot.id) === -1);

  // 選択中のルールXのリストを作成
  const selectedSubPlotList = selectedPlotList.filter(plot=> plot.type==='S');

  // 選択中のルールとルールXのリストを紐付けたオブジェクトのリストを作成
  for(let i=0, len = selectedSubPlotList.length + 1;i<len;i++){
    if(i===selectedSet.subplotNum){ break; }

    const selectedPlot = selectedSubPlotList[i] && selectedSubPlotList[i] || null;
    const sub = {
      // 選択されていないルール+選択中のルール
      subPlotList: selectedPlot ? [...subPlotList, selectedPlot] : subPlotList, 
      selectedPlot};
    subPlotLists.push(sub);
  }
  return { 
    mainPlotList,
    subPlotLists,
    selectedPlotList
  }
}

const mapDispatchToProps = (dispatch):IDispatchToProps => {
  return {
    onChange: (newPlot, oldPlot) => {
      dispatch(selectPlot(newPlot, oldPlot));
    }
  }
}

const PlotFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlotForm);

export default PlotFormContainer;