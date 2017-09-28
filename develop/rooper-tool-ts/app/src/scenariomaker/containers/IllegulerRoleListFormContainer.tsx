import { connect } from 'react-redux';
import {IllegulerRoleListForm} from '../components/InputForm/RoleListForm';
import Scenario from '../models/Scenario';
import {CharacterType} from '../models/Character';
import { selectRole  } from '../actions';

interface IState{
  scenario:Scenario
}

const mapStateToProps = (store:IState, ownProps) => {
  if(!store.scenario){
    return { 
      roleList:[],
      selectedKey:0
    }
  }
  const scenario = store.scenario;
  const {unselectedRoleList, characterRoleList} = scenario;
  const characterRole = characterRoleList.find(item=>item.characterId === CharacterType.mysteryBoy);
  const selectedKey = characterRole && characterRole.roleKey || unselectedRoleList[0].key;
  return { 
    roleList:unselectedRoleList,
    selectedKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (characterKey, roleId)=>{
        dispatch(selectRole(characterKey, roleId));
    }
  }
}

const IllegulerRoleListFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IllegulerRoleListForm);

export default IllegulerRoleListFormContainer;