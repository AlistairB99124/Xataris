import { DropdownModel } from '../../../../core/models/sharedModels';

export interface TimesheetViewModel {
    title: string;
    sites: Array<SiteViewModel>;
    operators: Array<DropdownModel<number>>;
    todaysDate: string;
    quoteEnabled: boolean;
    hoursAvailable: Array<DropdownModel<number>>;
    minsAvailable: Array<DropdownModel<number>>;
    statusAvailable: Array<DropdownModel<number>>;
    materialsAvailable: Array<DropdownModel<number>>;
    nonStockItem: boolean;
    filterMaterials: Array<DropdownModel<number>>;
    confirmForm: boolean;
    date: string;
    technician: string;
    pdfForm: any;
    siteName: string;
    loader: boolean;
    timesheetNo: string;
    statusLabel: string;
}

export interface SiteViewModel{
    id: number;
    name: string;
}

export interface Material{
    materialId: number;
    code: string;
    description: string;
    bomNumber: string;
    quantity: number;
}

export enum CompletionStatus{
    Chasing = 0,
    FirstFix = 1,
    SecondFix = 2,
    FinalFix = 3
}
export interface Column{
    order: number;
    columnType: ColumnType;
    columnName: string;
    width: number;
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

export interface Site{
    id: number;
    name: string;
    location: Location;
    abbr: string;
}

export interface Location{
    latitude: number;
    longitude: number;
    address: string;
}
