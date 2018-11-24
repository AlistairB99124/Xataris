import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiResult, SimpleResult, DropdownModel } from '../../../../core/models/sharedModels';

@Injectable()
export class GroupManagementApiService {

    constructor(private http: HttpClient) {
        
    }

    getGroups(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<any>>('https://api.xataris.co.uk/api/User/GetGroups', input);
    }

    deleteGroups(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/User/DeleteGroups', input);
    }

    getAvailableModules(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<ApiResult<Array<DropdownModel<number>>>>('https://api.xataris.co.uk/api/User/GetAvailableModules', input);
    }

    saveGroup(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/User/SaveGroup', input);
    }
}
