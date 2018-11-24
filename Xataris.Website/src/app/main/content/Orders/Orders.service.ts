import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiResult, SimpleResult, DropdownModel, UserDetails, SitePoco, MaterialPoco } from '../../../core/models/sharedModels';

@Injectable()
export class OrdersApiService {

    constructor(private http: HttpClient) {
        
    }

    add(input: OrderPoco){
        input['gUID'] = localStorage.getItem('userId'); 
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/order/add', input);
    }

    edit(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/order/edit', input);
    }

    delete(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/order/delete', input);
    }

    get(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<OrderPoco>>('https://api.xataris.co.uk/api/order/get', input);
    }

    getAll(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<OrderPoco>>>('https://api.xataris.co.uk/api/order/getAll', input);
    }

    getSites(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<SitePoco>>>('https://api.xataris.co.uk/api/order/getSites', input);
    }

    getUsers(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<UserDetails>>>('https://api.xataris.co.uk/api/order/getUsers', input);
    }

    getMaterials(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<MaterialPoco>>>('https://api.xataris.co.uk/api/order/getMaterials', input);
    }

    getOrderItems(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<Array<OrderItemPoco>>>('https://api.xataris.co.uk/api/order/GetOrderItems', input);
    }
}

export interface OrderPoco {
    id: number;
    dateCreated: Date;
    plumber: string;
    site: string;
    orderItems: Array<OrderItemPoco>;
    deleted: boolean;
    isSelected: boolean;
}

export interface OrderItemPoco {
    stockCode: string;
    stockDescription: string;
    stockCost: number;
    quantity: number;
    orderId: number;
    order: OrderPoco;
}

