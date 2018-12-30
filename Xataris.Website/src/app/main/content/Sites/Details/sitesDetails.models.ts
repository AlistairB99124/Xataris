import { FormControl } from '@angular/forms';

export interface SiteDetailsViewModel {
  site: Site;
  siteId: number;
  searchControl: FormControl;
  showSearchInput: boolean;
}

export interface Site {
  id: number;
  name: string;
  latLng: Location;
  address: string;
  abbr: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface GoogleResult {
  results: Array<GeoResults>;
}

export interface GeoResults {
  address_components: Array<GeoResult>;
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: Array<string>;
}

export interface GeoResult {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

export interface Geometry {
  bounds: Array<any>;
  location: LatLng;
  viewport: any;
  place_id: string;
  types: Array<string>;
}

export interface Site {
  name: string;
  latLng: LatLng;
}
export interface LatLng {
  lat: number;
  lng: number;
}
export interface GoogleResult {
  results: Array<GeoResults>;
}

export interface GeoResults {
  address_components: Array<GeoResult>;
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: Array<string>;
}

export interface GeoResult {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

export interface Geometry {
  bounds: Array<any>;
  location: LatLng;
  viewport: any;
  place_id: string;
  types: Array<string>;
}
