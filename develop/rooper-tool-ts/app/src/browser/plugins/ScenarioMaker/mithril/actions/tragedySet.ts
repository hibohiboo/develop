import { createAction } from 'redux-actions';
import { get as GetTragedySet } from '../browser/request';

export const GET = 'TRAGEDYSET_GET';
export const get = createAction(GET, url => GetTragedySet(url));
