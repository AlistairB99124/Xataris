import { DropdownModel } from '../../../../core/models/sharedModels';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import {
  MatDialogRef
} from '@angular/material';
import { GridOptions, ColumnType } from '../../../../core/components/grid/grid.models';
import { ReplaySubject } from 'rxjs';

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
  filterMaterials: ReplaySubject<Array<DropdownModel<number>>>;
  confirmForm: boolean;
  date: string;
  technician: string;
  pdfForm: any;
  siteName: string;
  loader: boolean;
  timesheetNo: string;
  statusLabel: string;
  form: FormGroup;
  materialForm: FormGroup;
  formErrors: any;
  materials: Array<any>;
  searchInput: string;
  dialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  hoursSelected: Array<DropdownModel<any>>;
  loadMaterials: boolean;
}

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
