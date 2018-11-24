import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sharedModels from '../../core/models/sharedModels';

@Injectable()
export class ToolbarApiService {

    constructor(private http: HttpClient) {
    }

    getUserDetails = (input) => this.http.post<sharedModels.ApiResult<sharedModels.UserDetails>>('https://api.xataris.co.uk/api/user/getToolbarDetails', input);

    logout = () => this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/account/logout', null).toPromise();
    
}
