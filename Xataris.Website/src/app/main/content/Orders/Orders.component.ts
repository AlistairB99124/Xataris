import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { GridOptions, ColumnDef, ColumnType, MaterialPoco } from '../../../core/models/sharedModels';
import { Router } from '@angular/router';
import * as domtoimage from 'dom-to-image';
import * as _ from 'lodash';
declare const jsPDF;
import * as m from './Orders.models';
import { ApiService } from '../../services/api.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fuse-orders',
    templateUrl: './Orders.component.html',
    styleUrls: ['./Orders.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OrdersComponent implements OnInit, OnDestroy {

    data: m.OrdersViewModel;
    materialCtrl: FormControl;
    _onDestroy = new Subject<void>();

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        private formBuilder: FormBuilder) {
        this.setupVariables();
    }

    setupVariables = () => {
        this.translationLoader.loadTranslations(english, afrikaans);
        this.data = {} as m.OrdersViewModel;
        this.data.loader = true;
        this.data.order = {} as m.OrderPoco;
        this.data.itemsSelected = [];
        this.data.formErrors = {
            plumber: {},
            material: {},
            site: {},
            quantity: {},
            nonQuantity: {},
            description: {}
        };
        this.data.orderForm = new FormGroup({
            plumber: new FormControl({}, [Validators.required]),
            material: new FormControl({}),
            site: new FormControl({}, [Validators.required]),
            quantity: new FormControl(0),
            nonQuantity: new FormControl(''),
            description: new FormControl('')
        });
        this.materialCtrl = new FormControl();
        this.data.filterMaterials = new ReplaySubject(1);
        this.data.confirmForm = false;
        this.data.ordersDetail = {} as m.OrderPoco;
        this.data.useNonMaterialField = new FormControl(false);
        this.data.nonMaterialDescription = '';
        this.data.materials = [];
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
        this.getMaterials().then(() => {
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
        });
    }

    private filterMaterials = () => {
        if (!this.data.filterMaterials) {
            return;
          }
          // get the search keyword
          let search = this.materialCtrl.value;
          if (!search) {
            this.data.filterMaterials.next(this.data.materialsAvailable.slice());
            return;
          } else {
            search = search.toLowerCase();
          }
          // filter the banks
          this.data.filterMaterials.next(
            this.data.materialsAvailable.filter((option) => option.stockCode.toLowerCase().includes(search) || option.stockDescription.toLowerCase().includes(search))
          );
    }

    private onOrderFormValuesChanged = () => {
        for (const field in this.data.formErrors) {
            if (!this.data.formErrors.hasOwnProperty(field)) {
                continue;
            }
            this.data.formErrors[field] = {};
            const control = this.data.orderForm.get(field);
            if (control && control.dirty && !control.valid) {
                this.data.formErrors[field] = control.errors;
            }
        }
    }

    public ngOnInit() {
        this.data.orderForm.valueChanges.subscribe(() => {
            this.onOrderFormValuesChanged();
        });
        this.materialCtrl.valueChanges
        .pipe(takeUntil<any>(this._onDestroy))
        .subscribe(() => {
            this.filterMaterials();
        });
    }

    public ngOnDestroy = () => {
        this._onDestroy.next();
        this._onDestroy.complete();
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
        this.data.ordersDetail.plumber = this.data.orderForm.controls.plumber.value.firstName + ' ' + this.data.orderForm.controls.plumber.value.lastName;
        this.data.ordersDetail.site = this.data.orderForm.controls.site.value.name;
        this.apiService.post('order/add', this.data.ordersDetail).then(res => {
            if (res.isSuccess) {
                this.data.ordersDetail = {} as m.OrderPoco;
                this.getAll();
                this.data.loader = false;
            }
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
                x.dateCreated = date.toLocaleDateString();
            });
            this.data.orders = res;
            this.data.ordersGrid.api.setRowData(this.data.orders);
        });
    }

    showDetailsPanel = () => {
        this.data.loader = true;
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
            materialId: this.data.useNonMaterialField ? 0 : this.data.orderForm.controls.material.value.id,
            stockCode: this.data.useNonMaterialField ? '' : this.data.orderForm.controls.material.value.stockCode,
            stockDescription: this.data.useNonMaterialField ? this.data.nonMaterialDescription : this.data.orderForm.controls.material.value.stockDescription,
            stockCost: this.data.useNonMaterialField ? 0 : this.data.orderForm.controls.material.value.cost,
            quantity: this.data.orderForm.controls.quantity.value ? this.data.orderForm.controls.quantity.value : this.data.orderForm.controls.nonQuantity.value,
            orderId: this.data.ordersDetail.id,
            order: this.data.ordersDetail
        });
        this.data.orderForm.controls.material.reset();
        this.data.orderForm.controls.quantity.reset();
        this.data.orderForm.controls.nonQuantity.reset();
    }

    getMaterials = async () => {
        return this.apiService.post('order/getMaterials', {}).then(res => {
            this.data.materialsAvailable = res;
            this.data.filterMaterials.next(this.data.materialsAvailable.slice());
        });
    }

    disableSave = () => {
        return !(this.data.orderForm.valid && this.data.itemsSelected.length > 0);
    }

    disableAddItem = () => {
        if (this.data.useNonMaterialField) {
            return this.data.orderForm.controls.nonQuantity.value === '';
        } else {
            return this.data.orderForm.controls.quantity.value === 0 && this.data.orderForm.controls.material;
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
