import { handleActions } from 'redux-actions';
import { TragedySet } from '../../common/models/TragedySet';
import { REQUEST, SUCCESS } from '../actions/tragedySet';

export default handleActions({
  [SUCCESS]: (state,  { payload }): TragedySet[] => {
    return payload.tragedySetList;
  },
  [REQUEST]: (state, { payload }): TragedySet[] => {
    return state;
  },
},                           []);
