import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as sharedModels from '../../../../core/models/sharedModels';

@Injectable()
export class SiteApiService {
    key = 'AIzaSyCJCX7rYxZqSd4tRp4mbBeWUqfGg80VWK0';
    constructor(private http: HttpClient)
    {
    }
    
    addSite(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/Site/AddSite', input);
    }

    getAddress(event){
        const query =  event.coords.lat + ', ' + event.coords.lng + '&key=AIzaSyCJCX7rYxZqSd4tRp4mbBeWUqfGg80VWK0';
        return this.http.get<GoogleResult>('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + query);
    }

    getSite(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<any>>('https://api.xataris.co.uk/api/Site/GetSite', input);
    }

    getLocation(input){
        const param = {
            locationsId: input,
            gUID: localStorage.getItem('userId')
        };
        return this.http.post<sharedModels.ApiResult<any>>('https://api.xataris.co.uk/api/Site/GetLocation', param);
    }

    getLatLng(input){
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=' + this.key;
        return this.http.get(url);
    }

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
