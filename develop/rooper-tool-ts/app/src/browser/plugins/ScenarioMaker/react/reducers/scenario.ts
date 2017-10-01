import { ScenarioActions } from '../actions';
import Scenario from '../models/Scenario';
import { TragedySet } from '../models/TragedySet';
import {Character} from '../models/Character';
import {Role} from '../models/Role';
import {getFirstCharacterList, getCharacter} from '../services/CharacterService';

const scenario = (state:Scenario = new Scenario, action?: ScenarioActions) => {
  switch (action.type) {
    case 'CREATE_SCENARIO':
      const characterList = getFirstCharacterList();
      return new Scenario(characterList, new TragedySet(),[], []);
    case 'SELECT_TRAGEDY_SET':
      return new Scenario(state.characterList, action.set,[],[]);
    case 'SELECT_PLOT':
      return selectPlot(state, action);
    case 'TOGGLE_CHARACTER':
      return toggleCharacter(state, action);
    case 'SELECT_ROLE':
      return selectRole(state, action);
    case 'INPUT_DAYS_IN_ONE_LOOP':
      return inputDaysInOneLoop(state, action);
    case 'INPUT_NUMBER_OF_LOOPS':
      return inputNumberOfLoops(state, action);
    case 'SELECT_INCIDENT':
      return selectIncident(state, action);
    case 'SELECT_CULPRIT':
      return selectCulprit(state, action);
    default:
      return state
  }
};

/**
 * ルールの追加・変更を行う
 */
function selectPlot({characterList, selectedSet, selectedPlotList}, {newPlot, oldPlotId}):Scenario{
  // 新規追加の場合、新しくルールリストに追加
  if(!oldPlotId){
    const newList = [...selectedPlotList, newPlot];
    return new Scenario(characterList, selectedSet, newList, createRoleList(selectedSet, newList));
  }

  // 変更の場合、古いルールの位置に新しいものを挿入
  const targetIndex = selectedPlotList.findIndex(plot=>plot.id === oldPlotId);
  selectedPlotList[targetIndex] = newPlot;
  const newList = [...selectedPlotList];
  return new Scenario(characterList, selectedSet, newList, createRoleList(selectedSet, newList));
}

/**
 * 選択中のルールから役職の一覧を作成する
 */
function createRoleList(selectedSet, selectedPlotList){
  let selectedRoleList =[];
  selectedPlotList.forEach(plot=>{
    plot.roles.forEach(role_name=>{
      const role = selectedSet.roleList.find(role=>role.name === role_name);
      // 役職の上限を超えていなければ役職リストに追加
      if( ! role.limit || role.limit > selectedRoleList
                                          .filter( role => role.name === role_name )
                                          .length){
        // const copy = Object.assign({}, role);
        selectedRoleList.push(new Role(role.id, role.name, role.limit));
      }
    });
  });
  return selectedRoleList;
}

  /**
   * 選択したキャラクターを追加する。
   * もう一度選択でリストから外す。
   */
function toggleCharacter({characterList, selectedSet,selectedPlotList,selectedRoleList, characterRoleList}, {id}){
  // キャラクターを選択したらリストに追加。もう一度選択でリストから外す。
  const selectedIndex = characterList
                  .findIndex((char:Character)=>char.id === id && char.selected);
  const index = characterList
                  .findIndex((char:Character)=>char.id === id);
  const selectedCharcterId = characterList[index].id;

  // キャラクターを追加
  if( selectedIndex === -1){
    characterList[index] = getCharacter(selectedCharcterId, true);
    return new Scenario(characterList, selectedSet,selectedPlotList, selectedRoleList, characterRoleList);
  }

  // キャラクターを外す
  characterList[index] = getCharacter(selectedCharcterId, false);
  // 役職が設定されていた場合削除
  const list = characterRoleList.filter(m=> m.characterId !== selectedCharcterId);

  return new Scenario(characterList, selectedSet,selectedPlotList, selectedRoleList, list);
}

/**
 * 選択した役職をキャラクターに割り振る
 */
function selectRole({characterList, selectedSet, selectedPlotList, selectedRoleList, characterRoleList}, {roleKey, characterId}){
    // 既にキャラクターに役職が割り振られていたらキャラクター役職対応リストから取り除く
    const filteredList = characterRoleList.filter(m=>m.characterId !== characterId);

    // パーソンの役職の場合、キャラクター役職対応リストから取り除いたまま保存
    if(roleKey === 0){
      return new Scenario(characterList, selectedSet, selectedPlotList, selectedRoleList, filteredList);
    }

    // それ以外の場合、キャラクター役職対応リストに追加
    const addedList = [...filteredList, {characterId, roleKey}];
    return new Scenario(characterList, selectedSet, selectedPlotList, selectedRoleList, addedList);
}

/**
 * 1ループ日数
 */
function inputDaysInOneLoop(state, action){
  state.daysInOneLoop = action.daysInOneLoop;
  return Scenario.create(state);
}

/**
 * ループ数
 */
function inputNumberOfLoops(state, action){
  state.numberOfLoops = action.numberOfLoops;
  return Scenario.create(state);
}

/**
 * 事件
 */
function selectIncident(state:Scenario, {day, incidentId}){
  const before_list = state.selectedIncidentList;
  const filteredList = before_list.filter(m=>m.day !== day);

  if (incidentId !== 0) {
    state.selectedIncidentList = [...filteredList , {day, incidentId}];
  }

  return Scenario.create(state);
}

/**
 * 犯人
 */
function selectCulprit(state:Scenario, {day, culpritId}){
  const incident = state.selectedIncidentList.find(item => item.day === day);
  const before_list = state.selectedIncidentList;
  const filteredList = before_list.filter(m=>m.day !== day);
  const {incidentId} = incident;

  if(culpritId !==0 ){
    state.selectedIncidentList = [...filteredList , {day, incidentId, culpritId}];
  }else{
    state.selectedIncidentList = [...filteredList , {day, incidentId}];
  }
  return Scenario.create(state);
}

export default scenario;