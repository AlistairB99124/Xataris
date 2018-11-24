import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { SiteDetailsComponent } from './sitesDetails.component';
import { AgmCoreModule } from '@agm/core';

const routes = [
    {
        path     : 'Sites/Details',
        component: SiteDetailsComponent
    }
];

@NgModule({
    declarations: [
        SiteDetailsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCJCX7rYxZqSd4tRp4mbBeWUqfGg80VWK0'
        })
    ],
    exports     : [
        SiteDetailsComponent
    ]
})

export class SiteDetailsModule
{
}
