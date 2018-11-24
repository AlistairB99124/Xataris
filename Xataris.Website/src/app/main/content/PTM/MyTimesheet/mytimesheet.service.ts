import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sharedModels from '../../../../core/models/sharedModels';

@Injectable()
export class MyTimesheetApiService {

    constructor(private http: HttpClient) {
    }

    addTimesheet(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<SimpleTimesheetResult>>('https://api.xataris.co.uk/api/Timesheet/AddTimesheet', input);
    }

    getSites(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<sharedModels.ApiResult<Array<Site>>>('https://api.xataris.co.uk/api/Site/GetSiteNames', input);
    }

    getUsers(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<sharedModels.ApiResult<Array<sharedModels.UserDetails>>>('https://api.xataris.co.uk/api/Timesheet/GetUsers', input);
    }

    getMaterials(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<Array<sharedModels.MaterialPoco>>>('https://api.xataris.co.uk/api/Timesheet/GetMaterials', input);
    }

    getMaterial(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<any>>('https://api.xataris.co.uk/api/Timesheet/GetMaterial', input);
    }

    uploadTimesheet = (input) => {
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/Timesheet/UploadTimesheet', input);
    }

    saveMaterialItems = (input) => {
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/Timesheet/SaveMaterialItems', input);
    }
}
export interface Site{
    id: number;
    name: string;
    location: Location;
    abbr: string;
}

export interface Location{
    latitude: number;
    longitude: number;
    formattedAddress: string;
}

export interface SimpleTimesheetResult extends sharedModels.SimpleResult{
    timesheetCode: string;
}
