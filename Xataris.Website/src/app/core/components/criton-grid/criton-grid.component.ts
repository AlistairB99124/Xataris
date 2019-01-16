import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    ElementRef,
    Output,
    EventEmitter,
    ViewChildren
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
    ICritonGridApi,
    GridOptions,
    RenderType,
    CritonGridApi,
} from './criton-grid.model';

@Component({
    selector : 'criton-grid',
    templateUrl : './criton-grid.component.html',
    styleUrls: ['./criton-grid.component.scss']
})

export class CritonGridComponent implements OnInit, AfterViewInit {

    public dataSource = new MatTableDataSource();
    public shownColumns = [] as string[];
    public allSelected = false;

    @Input('options') public options: GridOptions;

    constructor() {
    }

    /*-----Public Methods-------*/

    public ngOnInit() {
        this.options.api = new CritonGridApi(this.dataSource, this.options, this.shownColumns);
    }

    public ngAfterViewInit() {
        if (this.options.onReady) {
            this.options.onReady(this.dataSource);
        }
    }

    public renderCell(params: any, column: ColumnDef) {
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
            case ColumnType.custom:
                return column.cellRenderer(params);
            default:
                return params[column.field];
        }
    }

    public getTotal(column: ColumnDef) {
        if (column.columnType === ColumnType.numeric) {
            return this.dataSource.data.map(t => t[column.field]).reduce((acc, value) => acc + value, 0).toFixed(2);
        } else if (column.columnType === ColumnType.currency) {
            if (this.options.aggragateResults) {
                let aggregateTotal = 0;
                this.dataSource.data.map(t =>  {
                    return {
                        value: parseFloat(t[this.options.aggregateMap.value]),
                        metric: parseFloat(t[this.options.aggregateMap.metric])
                    };
                }).reduce((acc: any, value: any) =>  {
                    aggregateTotal += (value.value * value.metric);
                    return value;
                }, {
                    value: 0,
                    metric: 0
                });
                return column.currencySymbol + ' ' + this.thousandsSeprator(aggregateTotal.toFixed(2));
            } else {
                return column.currencySymbol + ' ' + this.thousandsSeprator(column.currencySymbol + ' ' + this.dataSource.data.map(t => t[column.field]).reduce((acc, value) => {
                    return parseFloat(acc) + parseFloat(value);
                }, 0).toFixed(2).toString());
            }
        } else {
            return '';
        }
    }

    public selectAll() {
        this.dataSource.data.forEach((x: any) => {
            x.selected = this.allSelected;
        });
    }

    /*-------Private Methods--------*/
    private thousandsSeprator(x: string) {
        const parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `'`);
        return parts.join('.');
    }

}
