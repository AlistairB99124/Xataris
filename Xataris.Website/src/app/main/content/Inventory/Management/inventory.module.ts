import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../core/modules/shared.module';
import { InventoryComponent } from './inventory.component';
import { GridComponent } from '../../../../core/components/grid/grid.component';


const routes = [
    {
        path     : 'Inventory/Import',
        component: InventoryComponent
    }
];

@NgModule({
    declarations: [
        InventoryComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        InventoryComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})

export class InventoryModule
{
}
