import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs';

export type AuthMethod = 'google';

export interface UserData {
  method: AuthMethod;
  uid: any;
  name: string;
  email: string;
  avatarUrl: string;
}

@Injectable()
export class AuthService {
  methodName = 'Google Account';
  methodType = <AuthMethod>'google';

  currentUser: Observable<UserData>;
  isAuthenticated: Observable<boolean>;

  constructor(private _af: AngularFire) {
    this.currentUser = Observable.from(
      this._af.auth.map(auth =>
        this._getUser(auth)
      )
    )
    .publishBehavior(undefined)
    .refCount();

    this.isAuthenticated = this.currentUser.map(user => !!user);
  }

  public signIn(): Promise<boolean> {
    return <Promise<boolean>> this._af.auth.login().then(auth =>
      !!this._getUser(auth)
    );
  }

  public signOut(): Promise<void> {
    return this._af.auth.logout();
  }

  private _getUser(auth: FirebaseAuthState): UserData {
    return !auth || !auth.auth || auth.auth.isAnonymous
      ? undefined
      : <UserData>{
        uid: auth.uid,
        name: auth.auth.displayName,
        email: auth.auth.email,
        avatarUrl: auth.auth.photoURL,
        method: 'google'
      }
  }
}
