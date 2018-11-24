import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as sharedModels from '../../core/models/sharedModels';
import { ToolbarApiService } from './toolbar.services.component';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    data: ToolbarViewModel;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private http: HttpClient,
        private toolbarService: ToolbarApiService
    )
    {
        this.data = {} as ToolbarViewModel;
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];
        const input = {
            gUID: localStorage.getItem('userId')
        };
        this.toolbarService.getUserDetails(input).subscribe(res => {
            if (res){
                const user = res.data;
                if (user){
                    this.data.userFullname = user.firstName + ' ' + user.lastName;
                }
            } else{
                // console.log(res);
            }
        }, error => {
            // console.log(error);
        });

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'en-gb'
            },
            {
                'id'   : 'af',
                'title': 'Afrikaans',
                'flag' : 'af-za'
            },
            {
                'id'   : 'fr',
                'title': 'French',
                'flag' : 'fr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    async logout(){
        const result = await this.toolbarService.logout();
        if(result.data.isSuccess){
            localStorage.setItem('userId', null);
            this.router.navigateByUrl('account/login');
        }
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang)
    {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }
}
export interface ToolbarViewModel{
    userFullname: string;
}
