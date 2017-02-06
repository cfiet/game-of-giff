import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

export type GameStatus = "pending" | "playing" | "finished";

export interface Game {
  gameId: number;
  owner: number;
  status: GameStatus;
}

@Injectable()
export class GamesService {
  public myGames: Observable<Game[]>;

  constructor(private _af: AngularFire, private _authService: AuthService) {
    this.myGames = _authService.currentUser.switchMap(currentUser =>
      Observable.from(<Observable<Game[]>>_af.database.list('games'))
    )
    .publishBehavior([])
    .refCount();
  }
}