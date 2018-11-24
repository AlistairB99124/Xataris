import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../core/modules/shared.module';

import { LoginComponent } from './login.component';
import { MyTimesheetComponent } from '../../PTM/MyTimesheet/mytimesheet.component';

const routes = [
    {
        path     : 'account/login',
        component: LoginComponent
    },
    {
        path     : 'account/login/:token',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        LoginComponent
    ]
})

export class LoginModule
{
}
