import * as m from '../../../../core/models/sharedModels';
import { MatDialogRef } from '@angular/material';
import { MapModalComponent } from './map-modal/map-modal.component';
import { GridOptions } from '../../../../core/components/grid/grid.models';

export interface SiteManagementViewModel{
    siteGrid: GridOptions;
    loader: boolean;
    sites: Array<Site>;
    dialogRef: MatDialogRef<MapModalComponent>;
}
export interface SiteManagementViewModel{
    sites: Array<Site>;
    dataSource: any;
    displayedColumns: Array<string>;
    loader: boolean;
}

export interface Site{
    id: number;
    name: string;
    address: string;
    abbr: string;
}

export interface Location{
    latitude: number;
    longitude: number;
    formattedAddress: string;
}
