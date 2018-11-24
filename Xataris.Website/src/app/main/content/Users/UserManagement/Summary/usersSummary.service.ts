import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sharedModels from '../../../../../core/models/sharedModels';

@Injectable()
export class UsersApiService {

    constructor(private http: HttpClient) {
    }

    getUserManagementCounts(){
        const input = { gUID: localStorage.getItem('userId') };
            return this.http.post<sharedModels.ApiResult<TileCount>>('https://api.xataris.co.uk/api/User/GetUserManagementCounts', input).toPromise();
    }
       
    getUsersWithFilter(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<Array<sharedModels.UserDetails>>>('https://api.xataris.co.uk/api/User/GetFilteredUserList', input).toPromise();
    }

    saveUser(input){
        return this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/User/SaveUser', input).toPromise();
    }

    getGroups(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post<sharedModels.ApiResult<any>>('https://api.xataris.co.uk/api/User/GetGroups', null).toPromise();
    }

    getUsers(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<Array<sharedModels.UserDetails>>>('https://api.xataris.co.uk/api/User/GetFilteredUsers', input).toPromise();
    }

    getWarehouses(){
        const input = { gUID: localStorage.getItem('userId') };
        return this.http.post('https://api.xataris.co.uk/api/User/GetWarehouses', input).toPromise();
    }

    getUserByStatus(input){
        input['gUID'] = localStorage.getItem('userId');        
        return this.http.post('https://api.xataris.co.uk/api/User/GetUserByStatus', input).toPromise();
    }

    getUser(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post('https://api.xataris.co.uk/api/User/GetUser', input).toPromise();
    }

    deleteUser(input){
        input['gUID'] = localStorage.getItem('userId');
        return this.http.post<sharedModels.ApiResult<sharedModels.SimpleResult>>('https://api.xataris.co.uk/api/User/DeleteUser', input).toPromise();
    }

}
export interface TileCount{
    lockedOutCount: number;
    neverLoggedCount: number;
    loggedLastMonthCount: number;
    loggedInCount: number;
}

export interface UserFilterInput{
    filter: UserFilter;
}

export enum UserFilter {
    LockedOut = 0,
    NeverLoggedIn = 1,
    LoggedInLastMonth = 2,
    LoggedIn = 3
}
