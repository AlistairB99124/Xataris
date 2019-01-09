import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
    BASE_URL: string;
    TOKEN_KEY: string;
    constructor(private http: HttpClient, private router: Router ) {
        this.BASE_URL = 'https://api.xataris.co.uk/api/';
        // this.BASE_URL = 'https://localhost:44360/api/';
        this.TOKEN_KEY = 'localJwt';
    }

    public post = async (url: string, params?: any) => {
        if (!params){
            params = {};
        }

        const header = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem(this.TOKEN_KEY) });
        if (localStorage.getItem(this.TOKEN_KEY) === null) {
            this.http.post(this.BASE_URL + 'Account/Logout', { headers: header }).subscribe(() => {
                this.router.navigate(['account/login']);
            });
        } else {
            return this.http.post(this.BASE_URL + url, params, { headers: header }).toPromise().then((res) => {
                if (res['logout']){
                    return this.http.post(this.BASE_URL + 'Account/Logout', { headers: header }).subscribe(() => {
                        localStorage.setItem(this.TOKEN_KEY, null);
                        this.router.navigateByUrl('account/login');
                        return;
                    });
                } else {
                    localStorage.setItem(this.TOKEN_KEY, res[this.TOKEN_KEY]);
                    localStorage.setItem('Modules', res['modules']);
                    return res['data'];
                }
            }, (error) => {
                switch (error.status) {
                    case 401:
                    this.http.post(this.BASE_URL + 'Account/Logout', { headers: header }).subscribe(() => {
                        localStorage.setItem(this.TOKEN_KEY, null);
                        this.router.navigateByUrl('account/login');
                    });
                    break;
                    default:
                        localStorage.setItem(this.TOKEN_KEY, null);
                        this.router.navigateByUrl('account/login');
                    break;
                }
            });
        }
    }

    public get = (url: string) => {
        return this.http.get(url).toPromise();
    }
}
