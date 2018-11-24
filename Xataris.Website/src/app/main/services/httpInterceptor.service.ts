import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import * as sharedModels from '../../core/models/sharedModels';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor() {
    }

    intercept(req, next){
        return next.handle(req);
    }
}
