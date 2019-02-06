import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../core/modules/shared.module';

import { MyTimesheetComponent } from './mytimesheet.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FacebookModule } from 'ngx-facebook';

const routes = [
    {
        path     : 'PTM/MyTimesheet',
        component: MyTimesheetComponent
    }
];

@NgModule({
    declarations: [
        MyTimesheetComponent
    ],
    imports     : [
        SharedModule,
        NgxMatSelectSearchModule,
        RouterModule.forChild(routes),
        FacebookModule.forRoot(),
    ],
    exports     : [
        MyTimesheetComponent
    ]
})

export class TimesheetModule
{
}
