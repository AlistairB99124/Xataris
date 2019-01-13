import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ApiService {
    private BASE_URL: string;
    private TOKEN_KEY: string;
    private jwt: string;
    private header: HttpHeaders;
    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar ) {

        this.BASE_URL = 'https://api.xataris.co.uk/api/';
        // this.BASE_URL = 'https://localhost:44360/api/';
        this.TOKEN_KEY = 'localJwt';
        this.jwt = '';
        this.header = new HttpHeaders();
    }

    private handleError = (error) => {
        switch (error.status) {
            case 401:
                this.http.post(this.BASE_URL + 'Account/Logout', { headers: this.header }).subscribe(() => {
                    this.jwt = '';
                    this.snackbar.open('You were logged with error ' + error.status, '', { duration: 5000 });
                    this.router.navigateByUrl('account/login');
                });
                break;
            default:
                this.jwt = '';
                this.snackbar.open('You were logged with error ' + error.status, '', { duration: 5000 });
                this.router.navigateByUrl('account/login');
                break;
        }
    }

    private handleSuccess = (res) => {
        if (res['logout']){
            return this.http.post(this.BASE_URL + 'Account/Logout', { headers: this.header }).subscribe(() => {
                this.jwt = '';
                this.router.navigateByUrl('account/login');
                return;
            });
        } else {
            this.jwt = res[this.TOKEN_KEY];
            localStorage.setItem('Modules', res['modules']);
            sessionStorage.setItem('sessionJwt', res[this.TOKEN_KEY]);
            return res['data'];
        }
    }

    public post = async (url: string, params?: any) => {
        const sessionJwt = sessionStorage.getItem('sessionJwt');
        if (sessionJwt) { this.jwt = sessionJwt; }
        if (!params) { params = {}; }
        this.header = new HttpHeaders({ Authorization: 'Bearer ' + this.jwt });
        return this.http.post(this.BASE_URL + url, params, { headers: this.header })
            .toPromise()
            .then(this.handleSuccess, this.handleError)
            .catch(this.handleError);
    }

    public get = (url: string) => {
        return this.http.get(url).toPromise();
    }
}
