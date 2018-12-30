import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import { ApiService } from '../../../services/api.service';
import * as _ from 'lodash';
declare const google: any;
import {
    SiteDetailsViewModel,
    Location,
    Site
} from './sitesDetails.models';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'fuse-site-details',
    templateUrl: './sitesDetails.component.html',
    styleUrls: ['./sitesDetails.component.scss'],
    animations: fuseAnimations
})
export class SiteDetailsComponent implements OnInit {
    data: SiteDetailsViewModel;

    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        private route: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) { }

    public async ngOnInit() {
        await this.setupVariables().then(this.load);
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

    private setupVariables = async () => {
        this.translationLoader.loadTranslations(en, af);
        this.data = {} as SiteDetailsViewModel;
        this.data.showSearchInput = false;
        this.data.site = {} as Site;
        this.data.site.latLng = {} as Location;
        this.data.siteId = _.parseInt(localStorage.getItem('siteId'));
    }

    private load = async () => {
        this.mapsAPILoader.load().then(async () => {
            this.data.searchControl = new FormControl();
            await this.setCurrentPosition();
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });

            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                      return;
                    }
                    this.data.site.latLng.lat = place.geometry.location.lat();
                    this.data.site.latLng.lng = place.geometry.location.lng();
                });
            });
        });
    }

    private setCurrentPosition = async () => {
        if (this.data.siteId) {
            const input = { siteId: this.data.siteId };
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
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.data.site = <Site>{
                        name: '',
                        latLng: <Location>{
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        abbr: '',
                        address: ''
                    };
                });
            }
        }
    }

    public cancel = () => {
        localStorage.setItem('siteId', null);
        this.route.navigate(['Sites/Management']);
    }
}
