// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import searchReducer from './reducers/searchReducer';
import { rootEpic } from './epics/searchEpics';

const rootReducer = combineReducers({
  search: searchReducer,
});

export const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

// Run epics
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
