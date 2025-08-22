import axios from 'axios';
import { Place } from '../store/types';

// Replace with your Google API key
const GOOGLE_API_KEY = 'AIzaSyCoNBoOXqq4IzrsXhuta0HztREyVq4i16s';

// Base URLs
const AUTOCOMPLETE_URL = 'https://places.googleapis.com/v1/places:autocomplete';
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
/**
 * Fetch place suggestions from Google Places Autocomplete API
 * @param input search text
 */
export const fetchPlaces = async (text: string): Promise<Place[]> => {
  if (!text) return [];

  const url = `${AUTOCOMPLETE_URL}?input=${encodeURIComponent(text)}&key=${GOOGLE_API_KEY}`;
  console.log('Fetching places with URL:', url); // <-- log full request URL

  const body = {
    input: text
  };
  console.log('Request body:', JSON.stringify(body, null, 2));


  const response = await axios.post(
    `${AUTOCOMPLETE_URL}?key=${GOOGLE_API_KEY}`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const places: Place[] = response.data.suggestions.map((s: any) => ({
    placeId: s.placePrediction.placeId,
    mainText: s.placePrediction.structuredFormat.mainText.text,
    secondaryText: s.placePrediction.structuredFormat.secondaryText?.text,
    types: s.placePrediction.types,
    description: s.placePrediction.text.text,
  }));

  console.log('places:', places);


  return places;
};

/**
 * Fetch place details from Google Places Details API
 * @param placeId selected place ID
 */
export const fetchPlaceDetails = async (placeId: string): Promise<Place> => {
  if (!placeId) throw new Error('placeId is required');

  console.log('Fetching place details URL:', `${DETAILS_URL}?place_id=${encodeURIComponent(placeId)}&key=${GOOGLE_API_KEY}&fields=name,geometry`); // <-- log full request URL

  const response = await axios.get(
    `${DETAILS_URL}?place_id=${encodeURIComponent(placeId)}&key=${GOOGLE_API_KEY}&fields=name,geometry`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const result = response.data.result;
  console.log('Fetched place details:', response);
  return {
    placeId: result.place_id,
    description: result.name,
    lat: result.geometry?.location?.lat,
    lng: result.geometry?.location?.lng,
    mainText: result.name,
    secondaryText: result.formatted_address,
    types: result.types,
  };
};
