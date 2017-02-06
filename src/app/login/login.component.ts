import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../firebase-backend';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private redirectSub: Subscription;

  isAuthenticated: Observable<boolean>;

  constructor(private _authService: AuthService, private _router: Router) {
    this.isAuthenticated = _authService.isAuthenticated;
  }

  ngOnInit() {
    this.redirectSub = this.isAuthenticated.filter(isAuthenticated =>
      isAuthenticated
    ).subscribe(() => {
      this._router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this.redirectSub.unsubscribe();
  }

  public googleLogin(): void {
    this._authService.signIn();
  }
}
