import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SetupService } from '../services/setup.service';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard implements CanActivate {
  constructor(
    private setupService: SetupService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authState = this.setupService.setupStatus$().pipe(tap(success => {
      console.log("STATUS:")
      console.log(success)
      if (!success?.success) {
        this.router.navigate(['login'])
      }
    }));
    const result = new Promise<boolean>(function (resolve, reject) {
      authState.subscribe(x => {
        if (x?.success) {
          const status = x.setup;
          if (status && status?.created) {
            resolve(false)
          } else {
            resolve(true)
          }
        } else {
          resolve(false);
        }
      })
    })

    return result
  }

}
