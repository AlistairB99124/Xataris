import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from '../../models/sharedModels';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as m from '../../models/sharedModels';
import * as _ from 'lodash';

@Component({
    selector : 'fuse-grid',
    templateUrl : './grid.component.html',
    styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {

    
    dataSource = new MatTableDataSource();
    shownColumns = new Array<string>();
    @Input('gridOptions') gridOptions: GridOptions;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * ngOnInit
     */
    public ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.gridOptions.api = {} as m.GridApi;
        for (let i = 0; i < this.gridOptions.columnDefs.length; i++) {
            if (this.gridOptions.columnDefs[i].hide !== true) {
                this.shownColumns.push(this.gridOptions.columnDefs[i].field);
            }
            switch (this.gridOptions.columnDefs[i].columnType) {
                case m.ColumnType.currency:
                case m.ColumnType.numeric:
                case m.ColumnType.percentage:
                    this.gridOptions.columnDefs[i].class = 'text-right';
                break;
                case m.ColumnType.text:
                    if (this.gridOptions.columnDefs[i].renderType === m.RenderType.Anchor) {
                        this.gridOptions.columnDefs[i].class = 'text-centre';
                    } else {
                        this.gridOptions.columnDefs[i].class = 'text-left';
                    }
                break;
                case m.ColumnType.percentage:
                case m.ColumnType.checkbox:
                    this.gridOptions.columnDefs[i].class = 'text-centre';
                break;
            }
        }
        if (!this.gridOptions.api){
            this.gridOptions.api = {} as m.GridApi;
        }

        this.gridOptions.api.getSelectedRows = () => _.filter(this.gridOptions.rowData, x => x.selected === true);

        this.gridOptions.getRowData = () => this.dataSource.data;
        
        this.gridOptions.api.setRowData = (data: Array<any>) => {
            this.gridOptions.rowData = data;
            this.dataSource.data = data;
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
                        params[column.field] = params[column.field].replace(',', '');
                        params[column.field] = params[column.field].replace('.', ',');
                    }
                    value = parseFloat(params[column.field]);
                    if (_.isNumber(value)) {
                        return column.currencySymbol ? column.currencySymbol + ' ' + value.toFixed(2) : params["metric"] + ' ' + value.toFixed(2);
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
                default:
                    return params[column.field];
            }
        }
    }
}
