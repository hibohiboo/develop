// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('provide the initial state', () => {
  expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
})

test('handle ADD', () => {
  expect(reducer(initialState, actions.add(2))).toEqual({count: 2})
})
