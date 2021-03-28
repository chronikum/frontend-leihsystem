import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordValidatingGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(route.paramMap)
    const token = route.paramMap.get('token');
    const email = route.paramMap.get('email');
    console.log("TOKEN:" + token)
    console.log("EMAIL:" + email)
    const authState = this.apiService.resetPasswordValidator(token, email).pipe(tap(success => {
      console.log("SERVER RESPONSE: " + success)
      if (!success.success) {
        this.router.navigate(['login']);
      }
    }))
    const result = new Promise<boolean>(function (resolve, reject) {
      authState.subscribe(x => {
        if (x.success) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });

    return result;
  }

}
