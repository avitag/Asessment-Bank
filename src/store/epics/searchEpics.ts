import { ofType } from 'redux-observable';
import { catchError, debounceTime, map, mergeMap, of, from, tap } from 'rxjs';
import {
  searchPlaces,
  searchPlacesSuccess,
  searchPlacesFailure,
  selectPlace,
  selectPlaceSuccess,
  selectPlaceFailure,
} from '../actions/searchActions';
import { fetchPlaces, fetchPlaceDetails } from '../../api/googleApi';
import { AnyAction } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';

export const searchPlacesEpic = (action$: any) =>
  action$.pipe(
    ofType(searchPlaces.type),
    tap((action: AnyAction) => console.log('Searching for places:', action.payload)), // log the input
    debounceTime(300),
    mergeMap((action: AnyAction) =>
      from(fetchPlaces(action.payload)).pipe(
        tap((places) => console.log('Fetched places:', places)), // <-- log here
        map((places) => searchPlacesSuccess(places)),
        catchError((error) => {
          console.error('Error fetching places:', error); // <-- log the error here
          return of(searchPlacesFailure(error.message || 'Error fetching places'));
        }))
    )
  );

export const selectPlaceEpic = (action$: any) =>
  action$.pipe(
    ofType(selectPlace.type),
    mergeMap((action: AnyAction) =>
      from(fetchPlaceDetails(action.payload)).pipe(
        map((place) => selectPlaceSuccess(place)),
        catchError((error) => of(selectPlaceFailure(error.message || 'Error fetching place details')))
      )
    )
  );

export const rootEpic = combineEpics(searchPlacesEpic, selectPlaceEpic);
