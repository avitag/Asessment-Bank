import { createReducer } from '@reduxjs/toolkit';
import {
  searchPlacesSuccess,
  searchPlacesFailure,
  selectPlaceSuccess,
  selectPlaceFailure,
  addSearchHistory,
} from '../actions/searchActions';
import { Place } from '../types';

interface SearchState {
  results: Place[];
  selectedPlace: Place | null;
  history: string[];
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  selectedPlace: null,
  history: [],
  error: null,
};

const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchPlacesSuccess, (state, action) => {
      state.results = action.payload;
      state.error = null;
    })
    .addCase(searchPlacesFailure, (state, action) => {
      state.error = action.payload;
    })
    .addCase(selectPlaceSuccess, (state, action) => {
      state.selectedPlace = action.payload;
      state.error = null;
    })
    .addCase(selectPlaceFailure, (state, action) => {
      state.error = action.payload;
    })
    .addCase(addSearchHistory, (state, action) => {
      if (!action.payload) return;
      // avoid duplicates
      if (!state.history.includes(action.payload)) {
        state.history.unshift(action.payload); // add to front
        if (state.history.length > 10) state.history.pop(); // keep max 10
      }
    });
});

export default searchReducer;


