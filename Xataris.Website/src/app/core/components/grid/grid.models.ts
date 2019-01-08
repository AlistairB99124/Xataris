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
}

export interface GridApi{
    getSelectedRows: () => Array<any>;
    setRowData: (data: Array<any>) => void;
    setColumnDefs: (columns: ColumnDef[]) => void;
}

export interface GridOptions{
    columnDefs: Array<ColumnDef>;
    rowData: Array<any>;
    api?: GridApi;
    getRowData?: () => any;
    onReady: (param?) => void;
    showFooter?: boolean;
}
