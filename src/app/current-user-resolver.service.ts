import { Injectable } from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot 
       } from '@angular/router';

import { UserData, AuthService } from './firebase-backend';

@Injectable()
export class CurrentUserResolver implements Resolve<UserData> {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserData> {
    return this._authService.currentUser.take(1).toPromise().then(currentUser => {
      if (!currentUser) {
        this._router.navigate(['/login']);
        return undefined;
      }
      return currentUser;
    });
  }
}
