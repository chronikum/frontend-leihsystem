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

        // console.log("interceptor: " + req.url);
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req).pipe(tap(x => {
            if ((x as any).body?.success === false && (x as any).body?.errorCode === -1) {
                this.router.navigate(['error']);
            }
        }));
    }
}