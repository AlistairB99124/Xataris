import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../../core/modules/shared.module';
import { DashboardComponent } from './dashboard.component';
import { GridComponent } from './../../../core/components/grid/grid.component';


const routes = [
    {
        path     : 'Dashboard',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        DashboardComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})

export class InventoryModule
{
}
