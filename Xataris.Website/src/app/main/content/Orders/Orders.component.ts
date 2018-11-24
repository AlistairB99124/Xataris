import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { XatarisPermissions, DropdownModel, GridOptions, ColumnDef, ColumnType } from '../../../core/models/sharedModels';
import { OrdersApiService } from './Orders.service';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import * as domtoimage from 'dom-to-image';
import * as _ from 'lodash';
import * as jsPDF from 'jspdf';
import * as s from '../../../core/models/sharedModels';
import * as o from './Orders.service';

@Component({
    selector: 'fuse-orders',
    templateUrl: './Orders.component.html',
    styleUrls: ['./Orders.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OrdersComponent {

    data: OrdersViewModel;
    itemsDataSource;
    itemsDisplayedColumns;
    searchInput;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private ordersApiService: OrdersApiService,
        private router: Router,
        private formBuilder: FormBuilder) {
        this.translationLoader.loadTranslations(english, afrikaans);
       this.data = {} as OrdersViewModel;
       this.data.loader = true;
       this.searchInput = '';
       this.data.confirmForm = false;
       this.data.isOrderListCollapsed = false;
       this.data.isOrderDetailCollapsed = false;
       this.data.showDetailsPanel = false;
       this.data.ordersDetail = {} as o.OrderPoco;
       this.data.useNonMaterialField = false;
       this.data.nonMaterialDescription = '';
       this.data.materials = [];
       this.ordersApiService.getSites().subscribe(res => {
            _.forEach(res.data, (x) => {
                x.isSelected = false;
            }); 
            this.data.sitesAvailable = res.data; 
            this.ordersApiService.getUsers().subscribe(result => { 
             _.forEach(result.data, (x) => {
                 x.isSelected = false;
             });
             this.data.usersAvailable = result.data;
             this.getMaterials();
             this.getAll();
             this.data.ordersGrid = <GridOptions>{
                 columnDefs:[
                    <ColumnDef>{
                        field: 'id',
                        title: '',
                        columnType: ColumnType.checkbox
                    },
                    <ColumnDef>{
                        field: 'dateCreated',
                        title: 'Date Created',
                        columnType: ColumnType.text
                    },
                    <ColumnDef>{
                        field: 'plumber',
                        title: 'Plumber',
                        columnType: ColumnType.numeric
                    },
                    <ColumnDef>{
                        field: 'site',
                        title: 'Site',
                        columnType: ColumnType.currency,
                        currencySymbol: 'R'
                    }
                 ],
                 rowData: []
             }
             this.data.itemsSelected = [];
             this.itemsDataSource = new MatTableDataSource();
             this.itemsDataSource.data = [];
             this.itemsDisplayedColumns = ['materialId', 'stockCode', 'stockDescription', 'stockCost', 'quantity'];
             this.data.loader = false;
             });
        });
    }

    enableDelete(): boolean {
        if (this.data.ordersGrid.api) {
            if (this.data.ordersGrid.getRowData()) { 
                return this.data.ordersGrid.api.getSelectedRows().length > 0; 
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    searchMaterials(){
            const results = [];
            _.forEach(this.data.materialsAvailable, (x: s.MaterialPoco) => {
                if (x.stockCode.toLowerCase().includes(this.searchInput.toLowerCase()) || x.stockDescription.toLowerCase().includes(this.searchInput.toLowerCase())) {
                    results.push(x);
                }
            });
            this.data.filterMaterials = results;
    }

    enableEdit(): boolean {
        if (this.data.ordersGrid.api) {
            this.data.ordersGrid.api.getSelectedRows().length === 1;
        } else {
            return false;
        }
    }  
    add(){
        this.data.loader = true;
        this.data.ordersDetail.orderItems = _.cloneDeep(this.data.itemsSelected);
        this.data.ordersDetail.plumber = this.data.userSelected.firstName + ' ' + this.data.userSelected.lastName;
        this.data.ordersDetail.site = this.data.siteSelected.name;
        this.ordersApiService.add(this.data.ordersDetail).subscribe(res => {
            if (res.data.isSuccess) {
                this.data.ordersDetail = {} as o.OrderPoco;
                this.data.isOrderDetailCollapsed = true;
                this.data.isOrderListCollapsed = false;
                this.data.showDetailsPanel = false;
                this.getAll();
                this.data.loader = false;
            }
        });
    }

    edit(){
        this.ordersApiService.edit(this.data.ordersDetail).subscribe(res => {
            
        });
    }

    delete(){
        const orders = this.data.ordersGrid.api.getSelectedRows();
            _.forEach(orders, (x) => {
                this.ordersApiService.delete(x.id).subscribe(res => {
                    if (res.data.isSuccess) {
                        _.remove(this.data.orders, (i) => i.id === x.id);                        
                    }
                });
            });
            this.data.ordersGrid.api.setRowData(this.data.orders);
    }

    get(){
        this.ordersApiService.get(this.data.ordersDetail.id).subscribe(res => {
            this.data.ordersDetail = res.data;
        });
    }

    getAll(){
        this.ordersApiService.getAll().subscribe(res => {
            _.forEach(res.data, (x) => {
                const date = new Date(x.dateCreated);
                x.dateCreated = date.toDateString();
            });
            this.data.orders = res.data;
            this.data.ordersGrid.api.setRowData(this.data.orders);
        });
    }

    showDetailsPanel(){
        this.data.loader = true;
        this.data.isOrderListCollapsed = true;
        this.data.showDetailsPanel = true;
        const order = <o.OrderPoco>_.first(this.data.ordersGrid.api.getSelectedRows());
        if (order) {
            this.data.ordersDetail = <o.OrderPoco>{
                id: order.id,
                dateCreated: order.dateCreated,
                plumber: order.plumber,
                site: order.site,
                orderItems: order.orderItems,
                deleted: order.deleted,
                isSelected: order.isSelected
            };
            this.ordersApiService.getOrderItems(this.data.ordersDetail.id).subscribe(res => {
              this.data.ordersDetail.orderItems = res.data;  
              this.data.siteSelected = _.find(this.data.sitesAvailable, (x) => x.name === this.data.ordersDetail.site);
              this.data.userSelected = _.find(this.data.usersAvailable, (x) => (x.firstName + ' ' + x.lastName) === this.data.ordersDetail.plumber);
              this.data.itemsSelected = this.data.ordersDetail.orderItems;
              this.itemsDataSource.data = this.data.itemsSelected;
              this.data.loader = false;
            });
        } else {
            this.data.ordersDetail = <o.OrderPoco>{
                id: 0,
                dateCreated: new Date(),
                plumber: '',
                site: '',
                orderItems: [],
                deleted: false,
                isSelected: true
            };
            this.data.loader = false;
        }
    }

    addMaterialItem(){
        this.data.itemsSelected.push(<o.OrderItemPoco>{
            isSelected: false,
            materialId: this.data.useNonMaterialField ? 0 : this.data.materialSelected.id,
            stockCode: this.data.useNonMaterialField ? '' : this.data.materialSelected.stockCode,
            stockDescription: this.data.useNonMaterialField ? this.data.nonMaterialDescription : this.data.materialSelected.stockDescription,
            stockCost: this.data.useNonMaterialField ? 0 : this.data.materialSelected.cost,
            quantity: this.data.itemQuantity, 
            orderId: this.data.ordersDetail.id,
            order: this.data.ordersDetail
        });
        this.itemsDataSource.data = this.data.itemsSelected;
        this.data.itemQuantity = 0;
        this.data.materialSelected = {} as s.MaterialPoco;
    }

    deleteMaterialItem(){
        const itemSelected = _.find(this.data.itemsSelected, (x) => x.isSelected === true);
        _.remove(this.data.itemsSelected, (x) => x.stockCode === itemSelected.stockCode);
        this.itemsDataSource.data = this.data.itemsSelected;
    }

    disableDeleteItem = () => _.filter(this.data.itemsSelected, (x) => x.isSelected === true).length === 1;

    disableAddItem(){
        if (this.data.useNonMaterialField) {
            if (this.data.itemQuantity) {
                if (this.data.itemQuantity === 0) {
                    return true;
                } else {
                    if (this.data.nonMaterialDescription !== '') {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            if (this.data.materialSelected){
                if (this.data.materialSelected.id) {
                    if (this.data.itemQuantity){
                        if (this.data.itemQuantity === 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    getMaterials(){
        this.ordersApiService.getMaterials().subscribe(res => {
            this.data.materialsAvailable = res.data;
            this.data.filterMaterials = this.data.materialsAvailable;
        });
    }

    disableSave = () => {
        if (this.data.siteSelected) {
            if (this.data.userSelected) {
                if (this.data.siteSelected.id || this.data.userSelected.id) {
                    if (this.data.itemsSelected.length === 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    downloadPdf(){
        this.data.order = _.first(this.data.ordersGrid.api.getSelectedRows());
        this.data.confirmForm = true;
        this.data.loader = true;
            this.ordersApiService.getOrderItems({ ordersId: this.data.order.id }).subscribe(res => {
                _.forEach(res.data, (x) => {
                    this.data.materials.push({
                        stockCode: x.stockCode,
                        stockDescription: x.stockDescription,
                        stockCost: x.stockCost,
                        quantity: x.quantity,
                        orderId: x.orderId,
                        order: this.data.order
                    });
                });
                setTimeout(() => {
                    const self = this;
                    const element = document.getElementById('formImage');
                    if (element) {
                        domtoimage.toPng(element).then((url) => {
                            const doc = new jsPDF();
                            const img = new Image();
                            img.src = url;
                            img.crossOrigin = 'Anonymous';
                            const persist = () => {
                                doc.save('OrderNo' + this.data.order.id + '.pdf');
                                this.data.confirmForm = false;
                                this.data.loader = false;
                            };
                            img.onload = function () {
                                doc.addImage(this, 0, 0, 210, 297);
                                persist();
                            };                
                        });
                    } else {
                        self.data.confirmForm = false;
                        self.data.loader = false;
                    }
                }, 5000);
            });      
    }
}

export interface OrdersViewModel {
    isOrderListCollapsed: boolean;
    isOrderDetailCollapsed: boolean;
    showDetailsPanel: boolean;
    ordersDetail: o.OrderPoco;
    orders: Array<o.OrderPoco>;
    sitesAvailable: Array<s.SitePoco>;
    siteSelected: s.SitePoco;
    usersAvailable: Array<s.UserDetails>;
    userSelected: s.UserDetails;
    materialsAvailable: Array<s.MaterialPoco>;
    materialSelected: s.MaterialPoco;
    itemQuantity: number;
    itemsSelected: Array<o.OrderItemPoco>;
    loader: boolean;
    filterMaterials: Array<s.MaterialPoco>;
    useNonMaterialField: boolean;
    nonMaterialDescription: string;
    selectedOrderMaterials: Array<OrderMaterial>;
    order: o.OrderPoco;
    confirmForm: boolean;
    materials: Array<any>;
}

export interface OrderMaterial {
    id: number;
    deleted: boolean;
    stockCode: string;
    stockDescription: string;
    stockCost: number;
    quantity: number;
}
