import { MatTableDataSource } from '@angular/material';

export enum ColumnType{
    text,
    currency,
    numeric,
    percentage,
    checkbox,
    icon,
    date,
    boolean,
    input
}

export enum RenderType{
    Anchor,
    Icon,
    Text
}

export interface ColumnDef{
    title: string;
    field: string;
    columnType: ColumnType;
    currencySymbol?: string;
    hide?: boolean;
    class?: string;
    renderType?: RenderType;
    iconName?: string;
    onClick?: (params?) => any;
    cellRenderer?: (params?) => void;
    actions?: Action[];
}

export interface Action {
    id: number;
    icon: string;
    label: string;
    onClick: (data?) => void;
}

export interface GridApi{
    getSelectedRows: () => Array<any>;
    setRowData: (data: Array<any>) => void;
    setColumnDefs: (columns: ColumnDef[]) => void;
    getRowData: () => Array<any>;
}

export interface GridOptions{
    columnDefs: Array<ColumnDef>;
    rowData: Array<any>;
    api?: GridApi;
    onReady: (param: MatTableDataSource<any>) => void;
    showFooter?: boolean;
    idRow?;
    aggragateResults?: boolean;
    aggregateMap?: AggregateMap;
}

export interface AggregateMap {
    metric: string;
    value: string;
}
