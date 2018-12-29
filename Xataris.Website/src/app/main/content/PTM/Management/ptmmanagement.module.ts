import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../core/modules/shared.module';

import { PTMManagementComponent } from './ptmmanagement.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NotificationService } from '../../../../core/services/notification.service';

const routes = [
    {
        path     : 'PTM/PTMManagement',
        component: PTMManagementComponent
    }
];

@NgModule({
    declarations: [
        PTMManagementComponent
    ],
    imports     : [
        SharedModule,
        NgxMatSelectSearchModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        PTMManagementComponent
    ]
})

export class PTMManagementModule
{
}
