import { DropdownModel } from '../../../../core/models/sharedModels';
import { ColumnType } from '../../../../core/components/grid/grid.models';

export interface SiteViewModel {
    id: number;
    name: string;
}

export interface Material {
    materialId: number;
    code: string;
    description: string;
    bomNumber: string;
    quantity: number;
}

export enum CompletionStatus {
    Chasing = 0,
    FirstFix = 1,
    SecondFix = 2,
    FinalFix = 3
}
export interface Column {
    order: number;
    columnType: ColumnType;
    columnName: string;
    width: number;
}

export interface Site {
    id: number;
    name: string;
    location: Location;
    abbr: string;
}

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

export interface TimeOptions {
    hours: Array<DropdownModel<number>>;
    minutes: Array<DropdownModel<number>>;
}
