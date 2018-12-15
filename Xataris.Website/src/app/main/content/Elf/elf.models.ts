import { MatTableDataSource } from '@angular/material';
import { DropdownModel, GridOptions } from '../../../core/models/sharedModels';
import { FormGroup } from '@angular/forms';

export interface ElfViewModel{
    grids: DataGrids;
    dataOptions: Array<DropdownModel<number>>;
    selectedDataOptions: DropdownModel<number>;
    isSummaryCollapsed: boolean;
    showDetailsPanel: boolean;
    isDetailsCollapsed: boolean;
    customerForm: FormGroup;
    customerFormErrors: any;
    idSelector: string;
    selectedData: any;
    customersId: number;
    selectedCustomer: any;
    canEdit: boolean;
    showCustomersDetailsGrid: boolean;
    currentCustomerQuotes: Array<Quote>;
    listTitle: string;
    showProductsGrid: boolean;
    selectedQuoteProducts: Array<any>;
    isCustomersQuotesDetailsCollapsed: boolean;
    showPredefinedItemsGrid: boolean;
    isPredefinedItemsGridCollapsed: boolean;
    selectedPredefinedProducts: any;
    isProductsGridCollapsed: boolean;
    showQuoteItems: boolean;
    isQuoteItemsGridCollapsed: boolean;
    selectedQuoteItem: any;
}

export interface DataGrids{
    predefinedItemsGrid: MatTableDataSource<any>;
    customersGrid: GridOptions;
    itemInventoriesGrid: MatTableDataSource<any>;
    itemsGrid: MatTableDataSource<any>;
    itemTypesGrid: MatTableDataSource<any>;
    itemTypeGroupsGrid: MatTableDataSource<any>;
    suppliersGrid: MatTableDataSource<any>;
    quotesGrid: MatTableDataSource<any>;
    quoteItemsGrid: MatTableDataSource<any>;
    quoteProductsGrid: MatTableDataSource<any>;
    // productsGrid: MatTableDataSource<any>;

    predefinedItemsGridColumns: Array<string>;
    customersGridColumns: Array<string>;
    itemInventoriesGridColumns: Array<string>;
    itemsGridColumns: Array<string>;
    itemTypesGridColumns: Array<string>;
    itemTypeGroupsGridColumns: Array<string>;
    suppliersGridColumns: Array<string>;
    quotesGridColumns: Array<string>;
    quoteItemsGridColumns: Array<string>;
    quoteProductsGridColumns: Array<string>;
    productsGridColumns: Array<string>;

    customerQuoteDetailsGrid: GridOptions;
    productsGrid: GridOptions;
    predefinedProductsGrid: GridOptions;
    customerQuoteItemsGrid: GridOptions;
}

export interface DataTabResult{
    predefinedItems: Array<PredefinedItem>;
    customers: Array<Customer>;
    itemInventories: Array<ItemInventory>;
    items: Array<Item>;
    itemTypes: Array<ItemType>;
    itemTypeGroups: Array<ItemTypeGroup>;
    suppliers: Array<Supplier>;
    quotes: Array<Quote>;
    quoteItems: Array<QuoteItem>;
    quoteProducts: Array<QuoteProduct>;
    products: Array<Product>;
    users: Array<any>;
}

export interface Name{
    name: string;
}

export interface Product extends Name{
    productsId: number;
    description: string;
}

export interface PredefinedItem{
    predefinedItemsId: number;
    itemsId: number;
    productsId: number;
    quantity: number;
}

export interface Customer extends Name{
    customersId: number;
    company: string;
    address: string;
}

export interface ItemInventory{
    itemInventoriesId: number;
    itemsId: number;
    quantity: number;
}

export interface Item extends Name{
    itemsId: number;
    itemTypesId: number;
    suppliersId: number;
    unitPrice: number;
    metric: string;
}

export interface ItemTypeGroup extends Name{
    itemTypeGroupsId: number;
}

export interface ItemType extends Name{
    itemTypesId: number;
    itemTypeGroupsId: number;
}

export interface QuoteItem{
    quoteItemsId: number;
    quotesId: number;
    itemsId: number;
}

export interface QuoteProduct{
    quoteProductsId: number;
    productsId: number;
    quotesId: number;
    product: Product;
}

export interface Quote{
    quotesId: number;
    customersId: number;
    subTotal: number;
    discount: number;
    vat: number;
    total: number;
    usersId: string;
}

export interface Supplier extends Name{
    suppliersId: number;
    webAddress: string;
    telephone: string;
}

export interface Product extends Name{
    productsId: number;
    description: string;
}

export enum DataType{
    Customers = 0,
    PredefinedItems = 1,
    Products = 2,
    Items = 3,
    ItemTypes = 4,
    ItemTypeGroups = 5,
    Suppliers = 6,
    Quotes = 7
}
