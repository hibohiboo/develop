import { handleActions } from 'redux-actions';
import { ALL, IVisibilityFilter, SET_VISIBILITY } from '../actions/filter';

export default handleActions({
  [SET_VISIBILITY]: (state, { payload:{ filter } }: IVisibilityFilter) => {
    return filter;
  },
},                           ALL);
