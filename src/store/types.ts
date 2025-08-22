// Type for a Google Place
export interface Place {
  placeId: string;
  mainText: string;
  secondaryText?: string;
  types?: string[];
  description: string;
  lat?: number;
  lng?: number;
}
