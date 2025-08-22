import { createAction } from '@reduxjs/toolkit';
import { Place } from '../types';

// 🔍 Autocomplete search
export const searchPlaces = createAction<string>('search/fetchPlaces'); 
export const searchPlacesSuccess = createAction<Place[]>('search/fetchPlacesSuccess');
export const searchPlacesFailure = createAction<string>('search/fetchPlacesFailure');

// 📍 Place details
export const selectPlace = createAction<string>('search/selectPlace'); // payload = placeId
export const selectPlaceSuccess = createAction<Place>('search/selectPlaceSuccess');
export const selectPlaceFailure = createAction<string>('search/selectPlaceFailure');

// ✨ Additional actions
export const setSelectedPlace = createAction<Place | null>('search/setSelectedPlace');
export const addSearchHistory = createAction<string>('search/addSearchHistory');
