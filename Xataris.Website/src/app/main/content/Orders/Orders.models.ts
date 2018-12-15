import * as m from '../../../core/models/sharedModels';

export interface OrdersViewModel{
    ordersGrid: m.GridOptions;
    orderItemGrid: m.GridOptions;

    isOrderListCollapsed: boolean;
    isOrderDetailCollapsed: boolean;
    showDetailsPanel: boolean;
    ordersDetail: OrderPoco;
    orders: Array<OrderPoco>;
    sitesAvailable: Array<m.SitePoco>;
    siteSelected: m.SitePoco;
    usersAvailable: Array<m.UserDetails>;
    userSelected: m.UserDetails;
    materialsAvailable: Array<m.MaterialPoco>;
    materialSelected: m.MaterialPoco;
    itemQuantity: number;
    itemsSelected: Array<OrderItemPoco>;
    loader: boolean;
    filterMaterials: Array<m.MaterialPoco>;
    useNonMaterialField: boolean;
    nonMaterialDescription: string;
    selectedOrderMaterials: Array<OrderMaterial>;
    order: OrderPoco;
    confirmForm: boolean;
    materials: Array<any>;
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
