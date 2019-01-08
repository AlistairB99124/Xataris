import { DropdownModel } from '../../../../core/models/sharedModels';
import { GridOptions } from '../../../../core/components/grid/grid.models';

export interface MaterialManagementViewModel {
    materialsToLoad: Array<any>;
    materialsToDisplay: Array<Array<string>>;
    warehouseName: string;
    enableAddWarehouse: boolean;
    availableWarehouses: Array<Warehouse>;
    selectedWarehouse: Warehouse;
    enableUpload: boolean;
    availableUsers: Array<DropdownModel<string>>;
    selectedUser: DropdownModel<string>;
    enableDelete: boolean;
    disableFilepicker: boolean;
    warehouses: Array<any>;
    inventoryGrid: GridOptions;
    setEnableButton: boolean;
}

export interface Inventory {
    warehouse: Warehouse;
    material: Material;
    quantity: number;
    dateAdded: Date;
    dateModified: Date;
    modifiedBy: string;
}



export interface Warehouse {
    id: number;
    name: string;
}

export interface Material {
    id: number;
    stockCode: string;
    stockDescription: string;
    cost: string;
}
