import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as m from './elf.models';
import { ApiResult, SimpleResult } from '../../../core/models/sharedModels';

@Injectable()
export class ElfApiService {

    constructor(private http: HttpClient) {

    }

    public GetDataTabResults = () => {
        const input = {
            gUID: localStorage.getItem("userId")
        };
        return this.http.post<ApiResult<m.DataTabResult>>('https://api.xataris.co.uk/api/Joey/GetDataTabResults', input,).toPromise().then((result) => { 
            localStorage.setItem('localJwt', result.localJwt); 
            return result.data; 
        });
    }

    public saveCustomer = (input) => {
        input['gUID'] = localStorage.getItem("userId");
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/Joey/saveCustomer', input,).toPromise().then((result) => { 
            localStorage.setItem('localJwt', result.localJwt); 
            return result.data; 
        });
    }
}
