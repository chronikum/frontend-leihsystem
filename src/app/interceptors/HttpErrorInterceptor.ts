import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoModalService } from '../services/info-modal.service';

/**
 * Intercepts error
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {

                    }
                    else {
                        console.log(error?.status);
                        if (error.status == 500)
                            this.router.navigate(["error"])
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}