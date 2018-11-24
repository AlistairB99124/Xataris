import { DropdownModel, GridOptions } from '../../../../core/models/sharedModels';

export interface MaterialManagementViewModel {
    files: Array<FileDetail>;
    file: FileDetail;
    columnTypeOptions: Array<DropdownModel<ColumnType>>;
    availableColumnMaps: Array<ColumnMap>;
    selectedColumnMapId: number;
    selectedColumnMap: ColumnMap;
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

export interface FileDetail{
    name: string;
    type: string;
    owner: string;
    size: string;
    modified: Date;
}

export interface Column{
    order: number;
    columnType: ColumnType;
    columnName: string;
}

export interface ColumnMap{
    id: number;
    mapName: string;
    columns: Array<Column>;
    displayColumns: Array<any>;
}

export enum ColumnType{
    General = 1,
    Number = 2,
    Currency = 3,
    Accounting = 4,
    ShortDate = 5,
    LongDate = 6,
    Time = 7,
    Percentage = 8,
    Fraction = 9,
    Scientific = 10,
    Text = 11
}
