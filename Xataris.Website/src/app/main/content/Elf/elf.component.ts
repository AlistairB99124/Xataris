import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { ElfApiService } from './elf.service';
import { MatSelectionListChange, MatPaginator } from '@angular/material';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import * as m from './elf.models';

import * as models from '../../../core/models/sharedModels';

import { TranslateService } from '@ngx-translate/core';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { locale as afrikaans } from './i18n/af';

import * as _ from 'lodash';

@Component({
    selector   : 'fuse-elf',
    templateUrl: './elf.component.html',
    styleUrls  : ['./elf.component.scss']
})
export class ElfComponent
{
    data: m.ElfViewModel;

    constructor(
        private ElfApiService: ElfApiService,
        private translationLoader: FuseTranslationLoaderService,
        private translateService: TranslateService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar
    ){
        this.translationLoader.loadTranslations(english, french);
        this.setupVariables();
        this.activateDataTab();
    }

    private setupVariables = () => {
        this.data = {} as m.ElfViewModel;
        this.data.showQuoteItems = false;
        this.data.isQuoteItemsGridCollapsed = false;
        this.data.canEdit = false;
        this.data.isSummaryCollapsed = false;
        this.data.showDetailsPanel = false;
        this.data.dataOptions = [
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.Customers,
                text: "Customers",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.PredefinedItems,
                text: "Predefined Items",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.Products,
                text: "Products",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.Items,
                text: "Items",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.ItemTypes,
                text: "Item Types",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.ItemTypeGroups,
                text: "Item Type Groups",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.Suppliers,
                text: "Suppliers",
                selected: false
            },
            <models.DropdownModel<m.DataType>>{
                value: m.DataType.Quotes,
                text: "Quotes",
                selected: false
            }
        ];
        this.data.selectedDataOptions = this.data.dataOptions[0];
        this.data.grids = <m.DataGrids>{
            predefinedItemsGrid: new MatTableDataSource(),
            customersGrid: {},
            itemInventoriesGrid: new MatTableDataSource(),
            itemsGrid: new MatTableDataSource(),
            itemTypesGrid: new MatTableDataSource(),
            itemTypeGroupsGrid: new MatTableDataSource(),
            suppliersGrid: new MatTableDataSource(),
            quotesGrid: new MatTableDataSource(),
            quoteItemsGrid: new MatTableDataSource(),
            quoteProductsGrid: new MatTableDataSource(),
            predefinedItemsGridColumns: ['item', 'product', 'quantity'],
            customersGridColumns: ['customersId', 'company', 'name', 'address'],
            itemInventoriesGridColumns: [''],
            itemsGridColumns: ['name', 'itemType', 'supplier', 'unitPrice'],
            itemTypesGridColumns: ['name', 'group'],
            itemTypeGroupsGridColumns: ['name'],
            suppliersGridColumns: ['name', 'webAddress', 'telephone'],
            quotesGridColumns: ['user', 'customer', 'subtotal', 'discount', 'vat', 'total'],
            quoteItemsGridColumns: [''],
            quoteProductsGridColumns: [''],
            productsGridColumns: ['name', 'description']
        };
        this.data.customerFormErrors = {
            name   : {},
            company: {},
            address: {}
        };

        this.data.customerForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            company: ['', [Validators.required]],
            address: ['', [Validators.required]]
        });
        this.data.customerForm.valueChanges.subscribe(() => {
            this.onCustomerFormValuesChanged();
        });

        this.data.grids.customersGrid = {
            columnDefs: [
                <models.ColumnDef>{
                    field: 'customersId',
                    columnType: models.ColumnType.checkbox,
                    title: ''
                },
                <models.ColumnDef>{
                    field: 'quotes',
                    columnType: models.ColumnType.icon,
                    title: '',
                    renderType: models.RenderType.Icon,
                    onClick: this.loadCustomerQuotes,
                    iconName: 'list'
                },
                <models.ColumnDef>{
                    field: 'name',
                    columnType: models.ColumnType.text,
                    title: 'Name'
                },
                <models.ColumnDef>{
                    field: 'company',
                    columnType: models.ColumnType.text,
                    title: 'Company'
                },
                <models.ColumnDef>{
                    field: 'address',
                    columnType: models.ColumnType.text,
                    title: 'Address'
                }
            ],
            rowData: [],
            onReady: this.loadCustomers
        } as models.GridOptions;
        this.data.grids.customerQuoteDetailsGrid = <models.GridOptions>{
            columnDefs: [
                <models.ColumnDef>{
                    field: 'customersId',
                    columnType: models.ColumnType.checkbox,
                    title: ''
                },
                {
                    field: 'quoteItems',
                    columnType: models.ColumnType.text,
                    title: 'Items',
                    renderType: models.RenderType.Anchor,
                    onClick: this.showQuoteItems,
                    cellRenderer: (params) => params.quoteItems.length,
                    class: 'text-centre'
                },
                {
                    field: 'quoteProducts',
                    columnType: models.ColumnType.text,
                    title: 'Products',
                    renderType: models.RenderType.Anchor,
                    onClick: this.showProductsGrid,
                    cellRenderer: (params) => params.quoteProducts.length,
                    class: 'text-centre'
                },
                <models.ColumnDef>{
                    field: 'subTotal',
                    columnType: models.ColumnType.currency,
                    title: 'Sub Total',
                    currencySymbol: '£'
                },
                <models.ColumnDef>{
                    field: 'discount',
                    columnType: models.ColumnType.percentage,
                    title: 'Discount',
                },
                <models.ColumnDef>{
                    field: 'vat',
                    columnType: models.ColumnType.percentage,
                    title: 'VAT'
                },
                <models.ColumnDef>{
                    field: 'total',
                    columnType: models.ColumnType.currency,
                    title: 'Total',
                    currencySymbol: '£'
                }
            ],
            rowData: [],
            onReady: this.loadQuoteDetails
        };
        this.data.grids.productsGrid = {
            columnDefs: [
                <models.ColumnDef>{
                    field: 'name',
                    columnType: models.ColumnType.text,
                    title: 'Name'
                },
                <models.ColumnDef>{
                    field: 'description',
                    columnType: models.ColumnType.text,
                    title: 'Description',
                },
                <models.ColumnDef>{
                    field: 'predefinedItems',
                    columnType: models.ColumnType.text,
                    title: 'Predefined Items',
                    renderType: models.RenderType.Anchor,
                    cellRenderer: (params) => {
                        return params.predefinedItems.length;
                    },
                    class: 'text-centre',
                    onClick: this.openPredefinedProducts
                }
            ],
            rowData: [],
            onReady: this.loadProducts
        };

        this.data.grids.predefinedProductsGrid = <models.GridOptions>{
            columnDefs: [
                <models.ColumnDef>{
                    field: 'name',
                    columnType: models.ColumnType.text,
                    title: 'Name'
                },
                <models.ColumnDef>{
                    field: 'type',
                    columnType: models.ColumnType.text,
                    title: 'Type'
                },
                <models.ColumnDef>{
                    field: 'typeGroup',
                    columnType: models.ColumnType.text,
                    title: 'Type Group'
                },
                <models.ColumnDef>{
                    field: 'supplier',
                    columnType: models.ColumnType.text,
                    title: 'Supplier'
                },
                <models.ColumnDef>{
                    field: 'quantity',
                    columnType: models.ColumnType.numeric,
                    title: 'Quantity'
                },
                <models.ColumnDef>{
                    field: 'unitPrice',
                    columnType: models.ColumnType.currency,
                    title: 'Unit Price',
                    currencySymbol: '£'
                }
            ],
            rowData: [],
            onReady: this.loadPredefinedProducts
        }

        this.data.grids.customerQuoteItemsGrid = <models.GridOptions>{
            columnDefs: [
                <models.ColumnDef>{
                    field: 'name',
                    columnType: models.ColumnType.text,
                    title: 'Name'
                },
                <models.ColumnDef>{
                    field: 'type',
                    columnType: models.ColumnType.text,
                    title: 'Type'
                },
                <models.ColumnDef>{
                    field: 'groupType',
                    columnType: models.ColumnType.text,
                    title: 'Group Type'
                },
                <models.ColumnDef>{
                    field: 'supplier',
                    columnType: models.ColumnType.text,
                    title: 'Supplier'
                },
                <models.ColumnDef>{
                    field: 'unitPrice',
                    columnType: models.ColumnType.currency,
                    title: 'Unit Price'
                }
            ],
            api: {},
            onReady: this.loadQuoteItems,
            rowData: []
        }
    }

    showQuoteItems = (params) => {
        this.data.showQuoteItems = true;
        this.data.isQuoteItemsGridCollapsed = false;
        this.data.isCustomersQuotesDetailsCollapsed = true;
        this.data.selectedQuoteItem = params;
    };

    loadQuoteItems = (params) => {
        const data = _.map(this.data.selectedQuoteItem["quoteItems"], x => {
            return {
                name: x.item.name,
                type: x.item.itemType.name,
                typeGroup: x.item.itemType.itemTypeGroup.name,
                metric: x.item.metric,
                supplier: x.item.supplier.name,
                unitPrice: x.item.unitPrice
            };
        });
        this.data.grids.customerQuoteItemsGrid.api.setRowData(data);
    };

    loadCustomers = () => {
        this.data.grids.customersGrid.api.setRowData(this.data.grids.customersGrid.rowData);
    }

    loadPredefinedProducts = () => {
        const input = _.map(this.data.selectedPredefinedProducts.predefinedItems, (x) => {
            return {
                name: x.item.name,
                type: x.item.itemType.name,
                typeGroup: x.item.itemType.itemTypeGroup.name,
                metric: x.item.metric,
                unitPrice: x.item.unitPrice,
                supplier: x.item.supplier.name,
                quantity: x.quantity
            };
        });        
        this.data.grids.predefinedProductsGrid.api.setRowData(input);
    }

    openPredefinedProducts = (params) => {
        this.data.showPredefinedItemsGrid = true;
        this.data.isProductsGridCollapsed = true;
        this.data.selectedPredefinedProducts = params;
    }

    public showProductsGrid = (params) => {        
        this.data.showProductsGrid = true;
        this.data.isCustomersQuotesDetailsCollapsed = true;
        const products = _.map(params.quoteProducts, (x: m.QuoteProduct) => x.product);
        this.data.selectedQuoteProducts = products;
    }

    public loadProducts = () => {
        this.data.grids.productsGrid.api.setRowData(this.data.selectedQuoteProducts);
    }

    public loadCustomerQuotes = (params) => {
        this.data.listTitle = params['name'];
        this.data.showCustomersDetailsGrid = true;
        this.data.isSummaryCollapsed = true;
        this.data.currentCustomerQuotes = _.cloneDeep(params.quotes);        
    }
    
    public loadQuoteDetails = () => {
        this.data.grids.customerQuoteDetailsGrid.api.setRowData(this.data.currentCustomerQuotes);
    }

    public activateDataTab = () => {
        this.ElfApiService.GetDataTabResults().then((result) => {
            this.data.grids.predefinedItemsGrid.data = _.map(result.predefinedItems, (x) => <any>{
                    item: _.find(result.items, (o: m.Item) => o.itemsId === x.itemsId).name,
                    product: _.find(result.products, (o) => o.productsId === x.productsId).name,
                    quantity: x.quantity });
            this.data.grids.itemInventoriesGrid.data = result.itemInventories;
            this.data.grids.itemsGrid.data = _.map(result.items, (x) => {
                return {
                    name: x.name,
                    itemType: _.find(result.itemTypes, o => o.itemTypesId === x.itemTypesId).name,
                    supplier: _.find(result.suppliers, o => o.suppliersId === x.suppliersId).name,
                    unitPrice: x.metric + ' ' + x.unitPrice.toFixed(2),
                };
            });
            this.data.grids.itemTypesGrid.data = _.map(result.itemTypes, (x) => {
                return {
                    name: x.name,
                    group: _.find(result.itemTypeGroups, o => o.itemTypeGroupsId === x.itemTypeGroupsId).name
                };
            });
            this.data.grids.itemTypeGroupsGrid.data = result.itemTypeGroups;
            this.data.grids.suppliersGrid.data = result.suppliers;
            this.data.grids.quotesGrid.data = _.map(result.quotes, (x) => {
                const user = _.find(result.users, o => o.id === x.usersId);
                return {
                    customer: _.find(result.customers, o => o.customersId === x.customersId).name,
                    user: user.lastName + ', ' + user.firstName,
                    subtotal: x.subTotal.toFixed(2),
                    discount: (x.discount * 100).toFixed(2),
                    vat: (x.vat * 100).toFixed(2),
                    total: x.total.toFixed(2),
                };
            });
            this.data.grids.quoteItemsGrid.data = result.quoteItems;
            this.data.grids.quoteProductsGrid.data = result.quoteProducts;
            this.data.grids.customersGrid.api.setRowData(result.customers);
        }, (error) => {
            console.log(error);
        });
    }

    onCustomerFormValuesChanged = () => {
        for (const field in this.data.customerFormErrors)
        {
            if ( !this.data.customerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }
            this.data.customerFormErrors[field] = {};
            const control = this.data.customerForm.get(field);
            if ( control && control.dirty && !control.valid )
            {
                this.data.customerFormErrors[field] = control.errors;
            }
        }
    };

    addDetail = () => {
        const selectedItem = this.data.selectedDataOptions;
        switch(selectedItem.value){
            case m.DataType.Customers:
                this.data.showDetailsPanel = true;
            break;
        }
    };

    openDetails = () => {
        const selectedItem = this.data.selectedDataOptions;
        this.data.isSummaryCollapsed = true;
        switch(selectedItem.value){
            case m.DataType.Customers:
                this.data.selectedCustomer = _.first(this.data.grids.customersGrid.api.getSelectedRows());
                this.data.selectedCustomer.selected = false;
                this.data.showDetailsPanel = true;
                this.data.customersId = this.data.selectedCustomer.customersId;
                this.data.customerForm.controls["name"].setValue(this.data.selectedCustomer.name);
                this.data.customerForm.controls["company"].setValue(this.data.selectedCustomer.company);
                this.data.customerForm.controls["address"].setValue(this.data.selectedCustomer.address);
            break;
            case m.DataType.Items:

            break;
            case m.DataType.ItemTypeGroups:

            break;
            case m.DataType.ItemTypes:

            break;
            case m.DataType.PredefinedItems:

            break;
            case m.DataType.Products:

            break;
            case m.DataType.Quotes:

            break;
            case m.DataType.Suppliers:

            break;
        }
    }

    closeDetails = () => {
        this.data.showDetailsPanel = false; 
        this.data.isSummaryCollapsed = false;
        this.data.customerForm.reset();
    }

    submitCustomer = async () => {
        const input = this.data.customerForm.value;
        input.customersId = this.data.selectedCustomer.customersId;
        const result = await this.ElfApiService.saveCustomer(input);
        if (result.isSuccess) {
            this.data.showDetailsPanel = false;
            this.data.isSummaryCollapsed = false;
            this.snackBar.open('Save Successfull', '', { duration: 5000 });
            this.activateDataTab();
        } else {
            this.snackBar.open('Save Failure', '', { duration: 5000 });
        }
    }

    public isEditDisabled () {
        if (this.data.grids.customersGrid.api) {
            const rowsSelected = _.filter(this.data.grids.customersGrid.api.getSelectedRows());
            if(rowsSelected.length === 0){
                return true;
            } else {
                return false;
            }
        }
    }
}