import { combineEpics } from 'redux-observable';
import { searchPlacesEpic } from './searchEpics';

// Combine all epics here
export const rootEpic = combineEpics(searchPlacesEpic);
