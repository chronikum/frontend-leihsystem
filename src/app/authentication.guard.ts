import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { GeneralServerResponse } from './models/GeneralServerResponse';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Returns true if current user is authenticated
 */
export class AuthenticationGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authState = this.apiService.checkAuth$().pipe(tap(success => {
      if (!success?.success) {
        console.log("NAVIGIERE LOGIn")
        this.router.navigate(['login']);
      }
    }))
    const result = new Promise<boolean>(function (resolve, reject) {
      authState.subscribe(x => {
        if (x?.success) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })

    return result;
  }

}
