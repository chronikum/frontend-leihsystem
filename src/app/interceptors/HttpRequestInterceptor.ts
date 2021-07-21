import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.includes('upload')) {
            req = req.clone({
                withCredentials: true
            });
            return next.handle(req);
        }
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req);
    }
}