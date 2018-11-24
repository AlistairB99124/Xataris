import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiResult, SimpleResult, DropdownModel } from '../../../../core/models/sharedModels';

@Injectable()
export class InventoryApiService {

    constructor(private http: HttpClient)
    {
    }
    
    saveMaterials(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/Material/SaveMaterials', input);
    }

    addWarehouse(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/Warehouse/AddWarehouse', input);
    }

    getWarehouses(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<Warehouse>>>('https://api.xataris.co.uk/api/Warehouse/GetWarehouses', input);
    }

    getInventory(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<Inventory>>>('https://api.xataris.co.uk/api/Material/GetInventory', input);
    }

    getUsers(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<DropdownModel<string>>>>('https://api.xataris.co.uk/api/Material/GetUsers', input);
    }

    getInventoryByWarehouse = (input) => {
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<Array<any>>>('https://api.xataris.co.uk/api/Material/GetInventoryByWarehouse', input).toPromise().then((res) => res.data);
    }

    deleteWarehouse(input){
        input['gUID'] = localStorage.getItem('userId');
        const token = localStorage.getItem('localJwt');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/Warehouse/DeleteWarehouse', input);
    }
}

export interface Inventory {
    warehouse: Warehouse;
    material: Material;
    quantity: number;
}

export interface Warehouse {
    id: number;
    name: string;
}

export interface Material {
    id: number;
    stockCode: string;
    stockDescription: string;
    cost: string;    
}
