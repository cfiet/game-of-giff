import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { AuthService, UserData } from './auth.service';
import * as shortid from 'shortid';

export type GameId = string;
export type GameStatus = 'pending' | 'playing' | 'finished';
export type PlayerGameState = 'invited' | 'joined' | 'declined'  | 'owner';
export type Players = { [key:string]: PlayerGameState }

export interface Game {
  createdAt: number;
  players: Players;
  status: GameStatus;
  confirmationCode: string;
}

export interface NewGame {
  gameId: string;
  code: string;
}

export interface UserGameData {
  currentGame?: string;
}

@Injectable()
export class GamesService {
  public currentGame: Observable<Game>;

  constructor(private _af: AngularFire, private _authService: AuthService) {
    this.currentGame = this._authService.currentUser
      .map(u => <UserGameData>u)
      .switchMap(u =>
        (u && u.currentGame)
          ? _af.database.object(`games/${u.currentGame}`)
          : Observable.of<Game>(null)
      )
      .publishBehavior(undefined)
      .refCount();
  }

  newGame(): Promise<void> {
    return this._authService.currentUser.take(1).switchMap(currentUser => {
      if (!currentUser) {
        throw new Error('Unable to create a game. You are not authenticated.');
      }

      return this.currentGame.take(1).map(currentGame => {
        if (currentGame) {
          throw new Error('You\'re already in a game');
        }
        const players: Players = {};
        players[currentUser.uid] = 'owner';
        return players;
      })
      .map(players =>  (<Game>{
        createdAt: Date.now(),
        status: 'pending',
        confirmationCode: shortid.generate(),
        players
      }))
      .switchMap(game => {
        console.log(JSON.stringify(game, null, 2));
        return this._af.database.list('games').push(game).then(gameData =>
          this._af.database.object(`users/${currentUser.uid}`)
            .set({ currentGame: gameData.key })
      )})
    }).toPromise();
  }
}