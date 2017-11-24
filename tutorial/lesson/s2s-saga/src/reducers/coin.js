import { handleActions } from "redux-actions";
import * as actions from "../actions";

const initialState = {};

export default handleActions(
  {
    [actions.getCoinRequest]: (state, action) => ({
      ...state
    }),
    [actions.getCoinSuccess]: (state, action) => ({
      ...state
    }),
    [actions.getCoinFailure]: (state, action) => ({
      ...state
    })
  },
  initialState
);
