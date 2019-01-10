import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import * as Models from './inventory.models';
import * as m from '../../../../core/models/sharedModels';
import { ApiService } from '../../../services/api.service';
import { ColumnDef, ColumnType, GridOptions } from '../../../../core/components/grid/grid.models';

@Component({
    selector: 'fuse-material-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class InventoryComponent implements OnInit {
    data: Models.MaterialManagementViewModel;
    startUpload = false;
    pathArr = [];

    constructor(
        private apiService: ApiService,
        private translationLoader: FuseTranslationLoaderService) {
    }

    public ngOnInit(){
        this.data = {} as Models.MaterialManagementViewModel;
        this.translationLoader.loadTranslations(english, afrikaans);
        this.data.materialsToLoad = [];
        this.data.materialsToDisplay = [];
        this.data.selectedWarehouse = {} as any;
        this.data.enableUpload = false;
        this.data.disableFilepicker = true;
        this.apiService.post('Warehouse/GetWarehouses', {}).then(res => {
            this.data.warehouses = res;
        });
        this.apiService.post('Material/GetUsers', {}).then(res => {
            this.data.availableUsers = res;
        });
        this.data.enableAddWarehouse = false;
        this.data.warehouseName = '';
        this.apiService.post('Warehouse/GetWarehouses', {}).then(res => {
            this.data.availableWarehouses = res;
        });
        this.data.inventoryGrid = <GridOptions>{
            columnDefs: [
                <ColumnDef>{
                    field: 'stockCode',
                    title: 'Stock Code',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'stockDescription',
                    title: 'Stock Description',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'level',
                    title: 'Level',
                    columnType: ColumnType.numeric
                },
                <ColumnDef>{
                    field: 'unitCostPrice',
                    title: 'Unit Cost',
                    columnType: ColumnType.currency,
                    currencySymbol: 'R'
                }
            ],
            rowData: [],
            showFooter: true
        };
    }

    reloadMaterialsGrid(){
        this.startUpload = true;
        const input = {
            warehousesId: this.data.selectedWarehouse.id
        };
        this.apiService.post('Material/GetInventoryByWarehouse', input).then(res => {
            this.data.inventoryGrid.api.setRowData(_.map(res, (x) => {
                return {
                    stockCode: x.stockCode,
                    stockDescription: x.stockDescription,
                    level: x.quantity,
                    unitCostPrice: x.cost
                };
            }));
            this.startUpload = false;
            this.data.disableFilepicker = false;
        }).then(this.setEnableButton);
    }

    deleteWarehouse(){
        this.apiService.post('Warehouse/DeleteWarehouse', { warehouseId: this.data.selectedWarehouse.id }).then(res => {
            if (res.isSuccess) {
                this.apiService.post('Warehouse/GetWarehouses', {}).then(result => {
                    this.data.inventoryGrid.api.setRowData(result);
                });
            }
        });
    }

    uploadMaterial = () => {
        this.startUpload = true;
        const input = {
            warehousesId: this.data.selectedWarehouse.id,
            inventory: _.map(this.data.inventoryGrid.api.getRowData(), (x) => {
                return {
                    stockCode: x.stockCode,
                    stockDescription: x.stockDescription,
                    quantity: x.level,
                    cost: x.unitCostPrice
                };
            })
        };
        this.apiService.post('Material/SaveMaterials', input).then(res => {
            if (res.isSuccess) {
                this.data.inventoryGrid.api.setRowData([]);
                this.data.materialsToLoad = [];
                this.startUpload = false;
                this.data.setEnableButton = false;
            } else {
                this.startUpload = false;
            }
        });
    }

    formatTime = (input: string) => {
        const timeArray = input.split(':');
        const hour = _.parseInt(timeArray[0]);
        const minute = _.parseInt(timeArray[1]);
        const secondDaytime = timeArray[2].split(' ');
        const seconds = _.parseInt(secondDaytime[0]);
        const Daytime = secondDaytime[1];
        if (Daytime === 'AM') {
            if (hour === 12){
                return new Date(1901, 1, 1, 0, minute, seconds);
            } else {
                return new Date(1901, 1, 1, hour, minute, seconds);
            }
        } else {
            return new Date(1901, 1, 1, 12, minute, seconds);
        }
    }

    handleFileInput(evt){
        this.startUpload = true;
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          const ws: XLSX.WorkSheet = XLSX.read(e.target.result, {type: 'binary'}).Sheets[XLSX.read(e.target.result, {type: 'binary'}).SheetNames[0]];
          const rows = new Array<any>();
          const sheet = _.first(Array<any>(XLSX.utils.sheet_to_json(ws, {header: 1})));
          _.forEach(sheet, (x) => {
              if (x[0]) {
                  rows.push({
                      stockCode: x[0],
                      stockDescription: x[1],
                      level: x[2],
                      unitCostPrice: x[3]
                  });
              }
          });
          rows.splice(0, 1);
          this.data.materialsToLoad = rows;
          this.data.inventoryGrid.api.setRowData(rows);
          this.data.enableUpload = this.data.selectedWarehouse.id !== undefined && this.data.inventoryGrid.api.getRowData().length !== 0;
          this.startUpload = false;
        };
        reader.readAsBinaryString(target.files[0]);
    }

    openAddWarehousePanel(){
        this.data.enableAddWarehouse = true;
    }

    setEnableButton(){
        this.data.enableUpload = this.data.selectedWarehouse.id !== null && this.data.inventoryGrid.api.getRowData().length !== 0;
    }

    saveWarehouse = () => {
        const input = {
            name: this.data.warehouseName,
            userId: this.data.selectedUser.value
        };
        this.apiService.post('Warehouse/AddWarehouse', input).then(res => {
            this.data.enableAddWarehouse = false;
            this.data.warehouseName = '';
            this.data.disableFilepicker = false;
            this.apiService.post('Warehouse/GetWarehouses', {}).then(result => {
                this.data.availableWarehouses = result;
                this.data.selectedWarehouse = _.find(result, (x) => x.name === input.name);
            });
        });
    }

    saveWarehouseDisabled = () => {
        return (this.data.selectedUser === undefined || this.data.warehouseName === '');
    }
}
