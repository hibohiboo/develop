import { combineReducers } from '@reduxjs/toolkit'
import scenarioModule, { Scenario } from './scenarioModule'

export interface RootState {
  scenario: Scenario
}

export const rootReducer = combineReducers({
  scenario: scenarioModule.reducer
})
