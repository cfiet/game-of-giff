import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';

import { appConfig, authConfig } from './config';

import { AuthService } from './auth.service';
import { GamesService } from './games.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(appConfig, authConfig)
  ],
  declarations: [],
  providers: [
    AuthService,
    GamesService
  ]
})
export class FirebaseBackendModule { }
