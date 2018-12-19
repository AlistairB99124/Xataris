import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { ApiService } from '../../../services/api.service';
import * as _ from 'lodash';
import {
    SiteDetailsViewModel,
    Location,
    Site
} from './sitesDetails.models';

@Component({
    selector: 'fuse-site-details',
    templateUrl: './sitesDetails.component.html',
    styleUrls: ['./sitesDetails.component.scss'],
    animations: fuseAnimations
})
export class SiteDetailsComponent implements OnInit {
    data: SiteDetailsViewModel;
    isMapReady = false;
    currgeocoder;
    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        private route: Router
    ) {
        this.ngOnInit();
    }

    public saveSite = async () => {
        const input = {
            id: this.data.site.id,
            name: this.data.site.name,
            latLng: this.data.site.latLng,
            address: this.data.site.address,
            abbr: this.data.site.abbr
        };
        const result = await this.apiService.post('Site/AddSite', input);
        if (result.isSuccess) {
            this.data.site.name = '';
            this.data.site.abbr = '';
            this.route.navigate(['Sites/Management']);
        }
    }

    public updateCoords = ($event) => {
        this.data.site.latLng = $event.coords;
    }

    public ngOnInit = async () => {
        this.data = {} as SiteDetailsViewModel;
        this.data.site = {} as Site;
        this.data.site.latLng = {} as Location;
        this.isMapReady = false;
        const siteId = localStorage.getItem('siteId');
        if (siteId !== null && siteId !== 'null') {
            const input = { siteId: siteId };
            const res = await this.apiService.post('Site/GetSite', input);
            this.data.site = <Site>{
                name: res.name,
                latLng: <Location>{
                    lat: res.latitude,
                    lng: res.longitude
                },
                abbr: res.abbr,
                address: res.address,
                id: res.id
            };
            this.isMapReady = true;
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const event = {
                        coords: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    };
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
            }
        }
    }

    public cancel = () => {
        localStorage.setItem('siteId', null);
        this.route.navigate(['Sites/Management']);
    }
}
