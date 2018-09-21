import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const SET_VISIBILITY = 'SET_VISIBILITY_FILTER';
export const ALL = 'SHOW_ALL';
export const COMPLETED = 'SHOW_COMPLETED';
export const ACTIVE = 'SHOW_ACTIVE';

export type VisibilityFilterType = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';

export interface IVisibilityFilter extends Action {
  type: 'SET_VISIBILITY_FILTER';
  payload: {
    filter: VisibilityFilterType;
  };
}
export const setVisibilityFilter =
  createAction(SET_VISIBILITY, (filter: string) => ({ filter }));
