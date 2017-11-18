// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = { count: number }

export const initialState: State = { count: 0 }

export default function(
  state: State = initialState,
  action: Action
): Exact<State> {
  switch (action.type) {
    case Actions.ADD:
      return {
        ...state,
        count: state.count + action.n,
      }

    default:
      return state
  }
}
