import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { fuseAnimations } from '../../core/animations';
import { FuseConfigService } from '../../core/services/config.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { DropdownModel, SimpleResult, ApiResult } from '../../core/models/sharedModels';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';

@Component({
    selector   : 'fuse-content',
    templateUrl: './content.component.html',
    styleUrls  : ['./content.component.scss'],
    animations : fuseAnimations
})
export class FuseContentComponent implements OnInit, OnDestroy
{
    onSettingsChanged: Subscription;
    fuseSettings: any;

    @HostBinding('@routerTransitionUp') routeAnimationUp = false;
    @HostBinding('@routerTransitionDown') routeAnimationDown = false;
    @HostBinding('@routerTransitionRight') routeAnimationRight = false;
    @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
    @HostBinding('@routerTransitionFade') routeAnimationFade = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fuseConfig: FuseConfigService,
        private apiService: ApiService,
        public snackBar: MatSnackBar,
        private location: Location
    )
    {
        const userId = localStorage.getItem('userId');
        this.apiService
          .post('User/ValidateById', { gUID: userId })
          .then(
            res => {
              if ((res && !res.isSuccess) || res === undefined) {
                this.router.navigate(['account/login']);
              }
            },
            reason => {
              this.router.navigate(['account/login']);
              this.snackBar.open('Failed to connect to the API', '', {
                duration: 4000
              });
            }
          );
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe((event) => {
                switch ( this.fuseSettings.routerAnimation )
                {
                    case 'fadeIn':
                        this.routeAnimationFade = !this.routeAnimationFade;
                        break;
                    case 'slideUp':
                        this.routeAnimationUp = !this.routeAnimationUp;
                        break;
                    case 'slideDown':
                        this.routeAnimationDown = !this.routeAnimationDown;
                        break;
                    case 'slideRight':
                        this.routeAnimationRight = !this.routeAnimationRight;
                        break;
                    case 'slideLeft':
                        this.routeAnimationLeft = !this.routeAnimationLeft;
                        break;
                }
            });

        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                    }
                );
    }

    ngOnInit()
    {

    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
