import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GridOptions } from '../../models/sharedModels';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as m from '../../models/sharedModels';
import * as _ from 'lodash';

@Component({
    selector : 'fuse-grid',
    templateUrl : './grid.component.html',
    styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit, AfterViewInit {

    dataSource = new MatTableDataSource();
    shownColumns = new Array<string>();
    @Input('gridOptions') gridOptions: GridOptions;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public ngOnInit () {
        this.dataSource.paginator = this.paginator;
        this.gridOptions.api = {} as m.GridApi;
        if (this.gridOptions.columnDefs.length > 0) {
            this.setColumns(this.gridOptions.columnDefs);
        }
        if (!this.gridOptions.api){
            this.gridOptions.api = {} as m.GridApi;
        }

        this.gridOptions.api.getSelectedRows = () => _.filter(this.gridOptions.rowData, x => x.selected === true);

        this.gridOptions.getRowData = () => this.dataSource.data;
        this.gridOptions.api.setRowData = (data: Array<any>) => {
            this.gridOptions.rowData = data;
            this.dataSource.data = data;
        };

        this.gridOptions.api.setColumnDefs = (columns: Array<m.ColumnDef>) => {
            this.setColumns(columns);
        };
    }

    private setColumns = (columns: Array<m.ColumnDef>) => {
        this.shownColumns = [];
        this.gridOptions.columnDefs = columns;
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].hide !== true) {
                this.shownColumns.push(columns[i].field);
            }
            switch (columns[i].columnType) {
                case m.ColumnType.currency:
                case m.ColumnType.numeric:
                case m.ColumnType.percentage:
                columns[i].class = 'text-right';
                break;
                case m.ColumnType.text:
                    if (columns[i].renderType === m.RenderType.Anchor) {
                        columns[i].class = 'text-centre';
                    } else {
                        columns[i].class = 'text-left';
                    }
                break;
                case m.ColumnType.percentage:
                case m.ColumnType.checkbox:
                    columns[i].class = 'text-centre';
                break;
            }
        }
    }

    public ngAfterViewInit () {
        if (this.gridOptions.onReady) {
            this.gridOptions.onReady(this.dataSource);
        }
    }

    renderCell = (params: any, column: m.ColumnDef) => {
        if (column.cellRenderer) {
            return column.cellRenderer(params);
        } else {
            let value = 0;
            switch (column.columnType) {
                case m.ColumnType.percentage:
                    return (params[column.field] * 100).toFixed(2) + ' %';
                case m.ColumnType.currency:
                    if (params[column.field]) {
                        params[column.field] = params[column.field].toString().replace(',', '');
                        params[column.field] = params[column.field].toString().replace('.', ',');
                    }
                    value = parseFloat(params[column.field]);
                    if (_.isNumber(value)) {
                        return column.currencySymbol ? column.currencySymbol + ' ' + value.toFixed(2) : params['metric'] + ' ' + value.toFixed(2);
                    } else {
                        return params[column.field];
                    }
                case m.ColumnType.numeric:
                    if (_.last(params[column.field]) === '.') {
                        params[column.field] = (<string>params[column.field]).substring(0, params[column.field].length - 1);
                    }
                    value = parseFloat(params[column.field]);
                    if (_.isNumber(value)) {
                        return value.toFixed(2);
                    } else {
                        return params[column.field];
                    }
                case m.ColumnType.text:
                    return params[column.field];
                case m.ColumnType.date:
                    return new Date(params[column.field]).toDateString();
                    case m.ColumnType.boolean:
                    return (params[column.field] as string).toLowerCase() === 'true' ? 'Yes' : 'No';
                default:
                    return params[column.field];
            }
        }
    }
}
