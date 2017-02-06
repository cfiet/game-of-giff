import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './firebase-backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isAuthenticated: Observable<boolean>;

  constructor(private _authService: AuthService, private _router: Router) {
    this.isAuthenticated = _authService.isAuthenticated;
  }

  public signOut() {
    this._authService.signOut().then(() => {
      this._router.navigate(['/login']);
    });
  }
}
