import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
    BASE_URL: string;
    TOKEN_KEY: string;
    constructor(private http: HttpClient) {
        this.BASE_URL = 'https://api.xataris.co.uk/api/';
        // this.BASE_URL = 'https://localhost:44360/api/'
        this.TOKEN_KEY = 'localJwt';
    }

    post = async (url: string, params) => {
        var header = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
        params['GUID'] = localStorage.getItem('userId');
        const result = await this.http.post(this.BASE_URL + url, params, { headers: header }).toPromise();
        // const getData = JSON.parse(result['body']);
        localStorage.setItem(this.TOKEN_KEY, result[this.TOKEN_KEY]);
        return result['data'];
    }
}
