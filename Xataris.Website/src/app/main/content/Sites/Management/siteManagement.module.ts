import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { SiteManagementComponent } from './siteManagement.component';
import { AgmCoreModule } from '@agm/core';
import { ApiService } from '../../../services/api.service';
import { MapModalComponent } from './map-modal/map-modal.component';

const routes = [
    {
        path     : 'Sites/Management',
        component: SiteManagementComponent
    }
];

@NgModule({
    declarations: [
        SiteManagementComponent,
        MapModalComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        })
    ],
    exports     : [
        SiteManagementComponent,
        MapModalComponent
    ],
    providers: [
        ApiService
    ],
    entryComponents: [
        MapModalComponent
    ]
})

export class SiteManagementModule
{
}
