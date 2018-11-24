import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sharedModels from '../../../../core/models/sharedModels';

@Injectable()
export class PTMManagementApiService {

    constructor(private http: HttpClient) {
    }

    getTimesheets(){
        const input = {};
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<any>>('https://api.xataris.co.uk/api/Timesheet/GetTimesheets', input);
    }

    deleteTimesheet(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/Timesheet/DeleteTimesheet', input);
    }

    getTimesheetMaterials(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<any>>('https://api.xataris.co.uk/api/Timesheet/GetTimesheetMaterials', input);
    }
}
export interface Material{
    materialId: number;
    code: string;
    description: string;
    bomNumber: string;
    quantity: number;
}
