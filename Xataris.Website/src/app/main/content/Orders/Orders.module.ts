import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { OrdersComponent } from './Orders.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes = [
  {
    path: 'orders/management',
    component: OrdersComponent
  }
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    NgxMatSelectSearchModule
  ],
  exports: [OrdersComponent]
})
export class OrdersModule {}
