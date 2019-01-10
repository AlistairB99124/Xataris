import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core';
import {
    MatPaginator,
    MatTableDataSource,
    MatSort
} from '@angular/material';
import * as _ from 'lodash';
import {
    ColumnDef,
    ColumnType,
    GridApi,
    GridOptions,
    RenderType,
} from './grid.models';

@Component({
    selector : 'app-grid',
    templateUrl : './grid.component.html',
    styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit, AfterViewInit {

    public dataSource = new MatTableDataSource();
    public shownColumns = new Array<string>();
    public showFooter = false;
    @Input('gridOptions') public gridOptions: GridOptions;
    @Output('inputChange') public inputChange: EventEmitter<any>;
    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    constructor(private elementRef: ElementRef) {

    }

    public ngOnInit() {
        this.elementRef.nativeElement.style.width = '100%';
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.gridOptions.api = this.initiliseApi();
        if (this.gridOptions.columnDefs.length > 0) {
            this.setColumns(this.gridOptions.columnDefs);
        }
    }

    public ngAfterViewInit() {
        if (this.gridOptions.onReady) {
            this.gridOptions.onReady(this.dataSource);
        }
    }

    public onInputChange(element: any) {
        this.inputChange.emit(element);
    }

    private initiliseApi(): GridApi {
        const api = {} as GridApi;
        api.getSelectedRows = () => {
            return this.gridOptions.rowData.filter(x => x.selected === true);
        };
        api.getRowData = () => {
            return this.dataSource.data;
        };
        api.setRowData = (data: Array<any>) => {
            this.gridOptions.rowData = data;
            this.dataSource.data = data;
        };
        api.setColumnDefs = (columns: Array<ColumnDef>) => {
            this.setColumns(columns);
        };
        return api;
    }

    private setColumns(columns: Array<ColumnDef>): void {
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

    private thousandsSeprator(x: string) {
        const parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `'`);
        return parts.join('.');
    }

    public renderCell(params: any, column: ColumnDef) {
        if (column.cellRenderer) {
            return column.cellRenderer(params);
        } else {
            let value = 0;
            switch (column.columnType) {
                case ColumnType.percentage:
                    return (params[column.field] * 100).toFixed(2) + ' %';
                case ColumnType.currency:
                    if (params[column.field]) {
                        params[column.field] = params[column.field].toString().replace(',', '');
                        params[column.field] = params[column.field].toString().replace('.', ',');
                    }
                    value = parseFloat(params[column.field]);
                    if (_.isNumber(value)) {
                        return this.thousandsSeprator(column.currencySymbol ? column.currencySymbol + ' ' + value.toFixed(2) : params['metric'] + ' ' + value.toFixed(2));
                    } else {
                        return params[column.field];
                    }
                case ColumnType.numeric:
                    if (_.last(params[column.field]) === '.') {
                        params[column.field] = (<string>params[column.field]).substring(0, params[column.field].length - 1);
                    }
                    value = parseFloat(params[column.field]);
                    if (_.isNumber(value)) {
                        return this.thousandsSeprator(value.toFixed(2));
                    } else {
                        return params[column.field];
                    }
                case ColumnType.text:
                    return params[column.field];
                case ColumnType.date:
                    return new Date(params[column.field]).toDateString();
                case ColumnType.boolean:
                    return (params[column.field] as string).toLowerCase() === 'true' ? 'Yes' : 'No';
                default:
                    return params[column.field];
            }
        }
    }

    public getTotal(column: ColumnDef) {
        if (column.columnType === ColumnType.numeric) {
            return this.dataSource.data.map(t => t[column.field]).reduce((acc, value) => acc + value, 0).toFixed(2);
        } else if (column.columnType === ColumnType.currency) {
            return this.thousandsSeprator(column.currencySymbol + ' ' + this.dataSource.data.map(t => t[column.field]).reduce((acc, value) => {
                return parseFloat(acc) + parseFloat(value);
            }, 0).toFixed(2).toString());
        } else {
            return '';
        }
    }
}
