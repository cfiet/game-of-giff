import { Injectable } from '@angular/core';
import { Router,
         CanActivate,
         CanActivateChild,
         RouterStateSnapshot,
         ActivatedRouteSnapshot 
       } from '@angular/router';

import { Observable } from 'rxjs';

import { UserData, AuthService } from './firebase-backend';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._authService.currentUser.map(user =>
      !!user
    ).do(authenticated => {
      if (!authenticated) {
        this._router.navigate(["/login"]);
      }
    })
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
