import * as m from '../../../core/models/sharedModels';
import { ReplaySubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { GridOptions } from '../../../core/components/grid/grid.models';

export interface OrdersViewModel{
    ordersGrid: GridOptions;
    ordersDetail: OrderPoco;
    orders: Array<OrderPoco>;
    sitesAvailable: Array<m.SitePoco>;
    usersAvailable: Array<m.UserDetails>;
    materialsAvailable: Array<m.MaterialPoco>;
    itemQuantity: number;
    itemsSelected: Array<OrderItemPoco>;
    loader: boolean;
    filterMaterials: ReplaySubject<any>;
    useNonMaterialField: FormControl;
    nonMaterialDescription: string;
    selectedOrderMaterials: Array<OrderMaterial>;
    order: OrderPoco;
    confirmForm: boolean;
    materials: Array<any>;
    formErrors: any;
    orderForm: FormGroup;
}

export interface OrderPoco {
    id: number;
    dateCreated: Date;
    plumber: string;
    site: string;
    orderItems: Array<OrderItemPoco>;
    deleted: boolean;
    isSelected: boolean;
}

export interface OrderItemPoco {
    stockCode: string;
    stockDescription: string;
    stockCost: number;
    quantity: number;
    orderId: number;
    order: OrderPoco;
}

export interface OrderMaterial {
    id: number;
    deleted: boolean;
    stockCode: string;
    stockDescription: string;
    stockCost: number;
    quantity: number;
}
