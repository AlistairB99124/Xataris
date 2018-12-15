import * as m from '../../../../core/models/sharedModels';

export interface SiteManagementViewModel{
    siteGrid: m.GridOptions;
    loader: boolean;
    sites: Array<Site>;
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
