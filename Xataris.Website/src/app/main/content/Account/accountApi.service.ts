import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResult, SimpleResult } from '../../../core/models/sharedModels';

@Injectable()
export class AccountApiService {

    constructor(private http: HttpClient) {
    }

    login(input){
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/User/Login', input);
    }

    forgotPassword(input){
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/User/ForgotPassword', input);
    }

    resetPassword(input){
        return this.http.post<ApiResult<SimpleResult>>('https://api.xataris.co.uk/api/User/ResetPassword', input);
    }
}

