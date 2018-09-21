// @flow
import { ADD } from './actionTypes'
import type { Add } from './actionTypes'

export function add(n: number): Add {
  return {
    type: ADD,
    n,
  }
}
