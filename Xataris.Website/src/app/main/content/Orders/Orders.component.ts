import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { GridOptions, ColumnDef, ColumnType, MaterialPoco } from '../../../core/models/sharedModels';
import { Router } from '@angular/router';
import * as domtoimage from 'dom-to-image';
import * as _ from 'lodash';
import * as jsPDF from 'jspdf';
import * as m from './Orders.models';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'fuse-orders',
    templateUrl: './Orders.component.html',
    styleUrls: ['./Orders.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OrdersComponent implements OnInit {

    data: m.OrdersViewModel;
    searchInput;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        private router: Router,
        private formBuilder: FormBuilder) {
        this.setupVariables();
        this.translationLoader.loadTranslations(english, afrikaans);
    }

    public ngOnInit = () => {
    }

    enableDelete = (): boolean => {
        if (this.data.ordersGrid && this.data.ordersGrid.api) {
            if (this.data.ordersGrid.getRowData()) {
                return this.data.ordersGrid.api.getSelectedRows().length > 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    searchMaterials = () => {
        const results = [];
        _.forEach(this.data.materialsAvailable, (x: MaterialPoco) => {
            if (x.stockCode.toLowerCase().includes(this.searchInput.toLowerCase()) || x.stockDescription.toLowerCase().includes(this.searchInput.toLowerCase())) {
                results.push(x);
            }
        });
        this.data.filterMaterials = results;
    }

    enableEdit = (): boolean => {
        if (this.data.ordersGrid && this.data.ordersGrid.api) {
            return this.data.ordersGrid.api.getSelectedRows().length === 1;
        } else {
            return false;
        }
    }

    add = () => {
        this.data.loader = true;
        this.data.ordersDetail.orderItems = _.cloneDeep(this.data.itemsSelected);
        this.data.ordersDetail.plumber = this.data.userSelected.firstName + ' ' + this.data.userSelected.lastName;
        this.data.ordersDetail.site = this.data.siteSelected.name;
        this.apiService.post('order/add', this.data.ordersDetail).then(res => {
            if (res.isSuccess) {
                this.data.ordersDetail = {} as m.OrderPoco;
                this.data.isOrderDetailCollapsed = true;
                this.data.isOrderListCollapsed = false;
                this.data.showDetailsPanel = false;
                this.getAll();
                this.data.orderItemGrid.api.setRowData([]);
                this.data.loader = false;
            }
        });
    }

    edit = () => {
        this.apiService.post('order/edit', this.data.ordersDetail).then(res => {

        });
    }

    delete = () => {
        const orders = this.data.ordersGrid.api.getSelectedRows();
        _.forEach(orders, (x) => {
            this.apiService.post('order/delete', { id: x.id }).then(res => {
                if (res.isSuccess) {
                    _.remove(this.data.orders, (i) => i.id === x.id);
                }
            });
        });
        this.data.ordersGrid.api.setRowData(this.data.orders);
    }

    get = () => {
        this.apiService.post('order/get', { ordersId: this.data.ordersDetail.id }).then(res => {
            this.data.ordersDetail = res;
        });
    }

    getAll = () => {
        this.apiService.post('order/getAll').then(res => {
            _.forEach(res, (x) => {
                const date = new Date(x.dateCreated);
                x.dateCreated = date.toDateString();
            });
            this.data.orders = res;
            this.data.ordersGrid.api.setRowData(this.data.orders);
        });
    }

    showDetailsPanel = () => {
        this.data.loader = true;
        this.data.isOrderListCollapsed = true;
        this.data.showDetailsPanel = true;
            this.data.ordersDetail = <m.OrderPoco>{
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

    addMaterialItem = () => {
        this.data.itemsSelected.push(<m.OrderItemPoco>{
            isSelected: false,
            materialId: this.data.useNonMaterialField ? 0 : this.data.materialSelected.id,
            stockCode: this.data.useNonMaterialField ? '' : this.data.materialSelected.stockCode,
            stockDescription: this.data.useNonMaterialField ? this.data.nonMaterialDescription : this.data.materialSelected.stockDescription,
            stockCost: this.data.useNonMaterialField ? 0 : this.data.materialSelected.cost,
            quantity: this.data.itemQuantity,
            orderId: this.data.ordersDetail.id,
            order: this.data.ordersDetail
        });
        this.data.orderItemGrid.api.setRowData(this.data.itemsSelected);
        this.data.itemQuantity = 0;
        this.data.materialSelected = {} as MaterialPoco;
    }

    deleteMaterialItem = () => {
        const itemSelected = this.data.orderItemGrid.api.getSelectedRows()[0];
        _.remove(this.data.orderItemGrid.getRowData(), x => x['stockCode'] === itemSelected.stockCode);
        this.data.orderItemGrid.api.setRowData(this.data.itemsSelected);
    }

    disableDeleteItem = () => {
        if (this.data.orderItemGrid.api) {
            return this.data.orderItemGrid.api.getSelectedRows().length === 1;
        }
    }

    disableAddItem = () => {
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
            if (this.data.materialSelected) {
                if (this.data.materialSelected.id) {
                    if (this.data.itemQuantity) {
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

    getMaterials = () => {
        this.apiService.post('order/getMaterials', {}).then(res => {
            this.data.materialsAvailable = res;
            this.data.filterMaterials = this.data.materialsAvailable;
        });
    }

    setupVariables = () => {
        this.data = {} as m.OrdersViewModel;
        this.data.loader = true;
        this.searchInput = '';
        this.data.confirmForm = false;
        this.data.isOrderListCollapsed = false;
        this.data.isOrderDetailCollapsed = false;
        this.data.showDetailsPanel = false;
        this.data.ordersDetail = {} as m.OrderPoco;
        this.data.useNonMaterialField = false;
        this.data.nonMaterialDescription = '';
        this.data.materials = [];
        this.data.orderItemGrid = <GridOptions>{
            columnDefs: [
                <ColumnDef>{
                    field: 'materialId',
                    title: '',
                    columnType: ColumnType.checkbox
                },
                <ColumnDef>{
                    field: 'stockCode',
                    title: '',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'stockDescription',
                    title: '',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'stockCost',
                    title: '',
                    columnType: ColumnType.currency,
                    currencySymbol: 'R'
                },
                <ColumnDef>{
                    field: 'quantity',
                    title: '',
                    columnType: ColumnType.numeric
                },
            ],
            rowData: []
        };
        this.data.ordersGrid = <GridOptions>{
            columnDefs: [
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
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'site',
                    title: 'Site',
                    columnType: ColumnType.text
                }
            ],
            rowData: [],
            onReady: this.getAll
        };
        this.getMaterials();
        this.apiService.post('order/getSites').then(res => {
            _.forEach(res, (x) => {
                x.isSelected = false;
            });
            this.data.sitesAvailable = res;
            this.apiService.post('order/getUsers').then(result => {
                _.forEach(result, (x) => {
                    x.isSelected = false;
                });
                this.data.usersAvailable = result;
                this.data.itemsSelected = [];
                this.data.loader = false;
            });
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

    downloadPdf = () => {
        this.data.order = _.first(this.data.ordersGrid.api.getSelectedRows());
        this.data.confirmForm = true;
        this.data.loader = true;
        this.apiService.post('order/GetOrderItems', { ordersId: this.data.order.id }).then(res => {
            _.forEach(res, (x) => {
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
                    (domtoimage as any).toPng(element).then((url) => {
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

    deleteOrder = () => {
        this.apiService.post('order/Delete', { ordersId: this.data.ordersGrid.api.getSelectedRows()[0].id }).then(res => {
            if (res.isSuccess) {
                this.getAll();
            }
        });
    }
}
