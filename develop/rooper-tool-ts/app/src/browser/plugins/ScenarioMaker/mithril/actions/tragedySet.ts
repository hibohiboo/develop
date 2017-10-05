import { createAction } from 'redux-actions';

export const REQUEST = 'TRAGEDYSET_LIST_FETCH_REQUESTED';
export const requsetTragedySetList = createAction(REQUEST, url => url);

export const FAILED = 'TRAGEDYSET_LIST_FETCH_FAILED';
export const failureTragedySetList = createAction(FAILED, message => message);

export const SUCCESS = 'TRAGEDYSET_LIST_FETCH_SUCCEEDED';
export const successTragedySetList = createAction(SUCCESS, tragedySetList => tragedySetList);
