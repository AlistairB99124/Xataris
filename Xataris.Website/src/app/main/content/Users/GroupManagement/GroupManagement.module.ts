import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../core/components/widget/widget.module';
import { GroupManagementComponent } from './GroupManagement.component';

const routes = [
    {
        path: 'users/groupmanagement',
        component: GroupManagementComponent
    }
];

@NgModule({
    declarations: [
        GroupManagementComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
    ]
})

export class GroupManagementModule
{
}
