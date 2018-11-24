import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import * as Models from '../../../../core/models/sharedModels';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { DropdownModel } from '../../../../core/models/sharedModels';
import { SiteApiService, LatLng } from './sitesDetails.service';
import * as _ from 'lodash';

@Component({
    selector: 'fuse-site-details',
    templateUrl: './sitesDetails.component.html',
    styleUrls: ['./sitesDetails.component.scss'],
    animations: fuseAnimations
})
export class SiteDetailsComponent implements OnInit{
    data;
    isMapReady = false;
    currgeocoder;
    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private siteApiService: SiteApiService,
        private route: Router
        ) {
            this.data = {} as SiteDetailsViewModel;
            this.data.site = {};
            this.data.site.location = {};
            this.isMapReady = false;
            this.data.searchInput = '';
            const siteId = localStorage.getItem('siteId');
            if (siteId !== null && siteId !== 'null') {
                const input = {
                    siteId: siteId
                };
                this.siteApiService.getSite(input).subscribe(res => {
                    this.data.site = <Site>{
                        name: res.data.name,
                        latLng: <Location>{
                            lat: res.data.latitude,
                            lng: res.data.longitude
                        },
                        abbr: res.data.abbr,
                        address: res.data.address,
                        id: res.data.id
                    };
                    this.isMapReady = true;
                });
            } else {
                if (navigator.geolocation){
                        navigator.geolocation.getCurrentPosition((position) => {
                            const event = {
                                coords: {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                }
                            };
                            this.siteApiService.getAddress(event).subscribe(res => {
                                this.data.possibleAddresses = _.map(res['results'], (r: GeoResults) => {
                                    return <Models.DropdownModel<string>>{
                                        text: r.formatted_address,
                                        value: r.place_id,
                                        selected: false
                                    };
                                });
                                const firstResult = _.first(this.data.possibleAddresses);
                                firstResult.selected = true;
                                this.data.site = <Site>{
                                    name: '',
                                    latLng: <Location>{
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                    },
                                    abbr: '',
                                    address: ''
                                };
                                this.isMapReady = true;
                            });
                        });
                }
            }
            
    }    

   saveSite(){
        const input = {
            id: this.data.site.id,
            name: this.data.site.name,
            latLng: this.data.site.latLng,
            address: this.data.site.address,
            abbr: this.data.site.abbr
        };
        this.siteApiService.addSite(input).subscribe(result => {
           if (result.data.isSuccess) {
                this.data.site.name = '';
                this.data.site.abbr = '';
                this.route.navigate(['Sites/Management']);
           } 
        });     
   }

    updateCoords = ($event) => {
        this.siteApiService.getAddress($event).subscribe(res => {
            this.data.possibleAddresses = _.map(res['results'], (r: GeoResults) => {
                return <Models.DropdownModel<string>>{
                    text: r.formatted_address,
                    value: r.place_id,
                    selected: false
                };
            });
            const firstResult = _.first(this.data.possibleAddresses);
            firstResult.selected = true;
            this.data.site.latLng = $event.coords;
        });       
    }

    ngOnInit()
    {
        
    }

    cancel(){
        localStorage.setItem('siteId', null);
        this.route.navigate(['Sites/Management']);
    }

}

export interface SiteDetailsViewModel{
    site: Site;
}

export interface Site{
    id: number;
    name: string;
    latLng: Location;
    address: string;
    abbr: string;
}

export interface Location{
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

