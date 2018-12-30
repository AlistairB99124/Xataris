import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import * as sharedModels from '../../core/models/sharedModels';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    languages: any = [];
    selectedLanguage: any = {};
    showLoadingBar: boolean;
    horizontalNav: boolean;
    data: ToolbarViewModel;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private apiService: ApiService
    ) {
        this.data = {} as ToolbarViewModel;
        const input = { gUID: localStorage.getItem('userId') };
        if (!location.href.includes('account')) {
            this.apiService.post('user/getToolbarDetails', input).then(res => {
                if (res) {
                  const user = res;
                  if (user) {
                    this.data.userFullname = user.firstName + ' ' + user.lastName;
                  }
                } else {
                  // console.log(res);
                }
            });
        }

        this.languages = [{ id: 'en', title: 'English', flag: 'en-gb' }, { id: 'af', title: 'Afrikaans', flag: 'af-za' }, { id: 'fr', title: 'French', flag: 'fr' }];

        this.selectedLanguage = this.languages[0];

        this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
            this.showLoadingBar = true;
          }
          if (event instanceof NavigationEnd) {
            this.showLoadingBar = false;
          }
        });

        this.fuseConfig.onSettingsChanged.subscribe(settings => {
          this.horizontalNav = settings.layout.navigation === 'top';
        });
    }

    async logout(){
        const result = await this.apiService.post('account/logout');
        if (result.isSuccess){
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
