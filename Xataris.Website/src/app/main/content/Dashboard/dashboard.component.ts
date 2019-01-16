import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from './../../../core/animations';
import { FuseTranslationLoaderService } from './../../../core/services/translation-loader.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DashboardComponent implements OnInit {

    constructor(
        private apiService: ApiService,
        private translationLoader: FuseTranslationLoaderService) {
    }

    public ngOnInit(){

    }

}
