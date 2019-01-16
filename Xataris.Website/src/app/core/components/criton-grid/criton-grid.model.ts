import { MatTableDataSource } from '@angular/material';

export interface ICritonGridApi {
    getSelectedRows: () => Array<any>;
    setRowData: (data: Array<any>) => void;
    setColumnDefs: (columns: ColumnDef[]) => void;
    getRowData: () => Array<any>;
}

export class CritonGridApi implements ICritonGridApi {

  private datasource: MatTableDataSource<any>;
  private gridOptions: GridOptions;
  private shownColumns: string[];

  constructor(
    datasource: MatTableDataSource<any>,
    gridOptions: GridOptions,
    shownColumns: string[]) {
    this.datasource = datasource;
    this.gridOptions = gridOptions;
    this.shownColumns = shownColumns;
  }

  getSelectedRows(): Array<any> {
    return this.gridOptions.rowData.filter(x => x.selected === true);
  }

  setRowData(data: Array<any>): void {
    this.datasource.data = data;
  }

  setColumnDefs(columns: ColumnDef[]): void {
    this.shownColumns = [];
    this.gridOptions.columnDefs = columns;
    for (const column of columns) {
        if (column.hide !== true) {
            this.shownColumns.push(column.field);
        }
        switch (column.columnType) {
            case ColumnType.currency:
            case ColumnType.numeric:
            case ColumnType.percentage:
                column.class = 'text-right';
            break;
            case ColumnType.text:
                if (column.renderType === RenderType.Anchor) {
                    column.class = 'text-centre';
                } else {
                    column.class = 'text-left';
                }
            break;
            case ColumnType.percentage:
            case ColumnType.checkbox:
                column.class = 'text-centre';
            break;
        }
    }
  }

  getRowData(): any[] {
    return this.gridOptions.rowData;
  }
}

export class GridOptions {
  public api: ICritonGridApi;
  public rowData: any[];
  public columnDefs: ColumnDef[];
  public onReady: (param: MatTableDataSource<any>) => void;
  public showFooter?: boolean;
  public idColumn?: string;
  public aggragateResults?: boolean;
  public aggregateMap?: AggregateMap;
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

export enum ColumnType{
  text,
  currency,
  numeric,
  percentage,
  checkbox,
  icon,
  date,
  boolean,
  input,
  custom
}

export enum RenderType{
  Anchor,
  Icon,
  Text
}

export interface AggregateMap {
  metric: string;
  value: string;
}
