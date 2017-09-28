import * as React from 'react';
import { connect } from 'react-redux';
import CharacterListForm from '../components/InputForm/CharacterListForm';
import Scenario from '../models/Scenario';
import { toggleCharacter, selectRole  } from '../actions';
interface IState{}

interface IProps{}

interface IStateToProps{
  characterWithRoleList:any;
  unallocatedRoleList:any;
}

interface IDispatchToProps{
  onToggle:any;
  onChange:any;
}

/**
 * まだ選択されていない役職一覧を作成。
 */
const mapStateToProps = (store):IStateToProps => {
  const scenario:Scenario = store.scenario;
  if(!scenario){
      return { 
        characterWithRoleList:[],
        unallocatedRoleList:[]
    }
  }
  const {characterWithRoleList, unallocatedRoleList} = scenario;

  return {
            characterWithRoleList,
            unallocatedRoleList
          };
}

const mapDispatchToProps = (dispatch):IDispatchToProps => {
  return {
    onToggle: (id:number) => {
      dispatch(toggleCharacter(id));
    },
    onChange: (characterKey, roleId)=>{
        dispatch(selectRole(characterKey, roleId));
    }
  }
}

const CharacterListFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterListForm);

export default CharacterListFormContainer;