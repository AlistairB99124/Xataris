import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
import { UsersSummaryComponent } from './UsersSummary.Component';
import {MatDatepickerModule} from '@angular/material/datepicker';

const routes = [
    {
        path: 'users/management',
        component: UsersSummaryComponent
    }
];

@NgModule({
    declarations: [
        UsersSummaryComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        MatDatepickerModule
    ],
    exports     : [
        UsersSummaryComponent
    ]
})

export class UsersSummaryModule
{
}
