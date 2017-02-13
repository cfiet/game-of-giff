import {
  Component,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

import { Observable } from 'rxjs';

import { Game, GamesService } from '../firebase-backend';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ 'opacity': '0' })),
      transition(':enter', [
        animate('200ms ease-in', style({ 'opacity': '1'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ 'opacity': '0'}))
      ])
    ])

  ]
})
export class DashboardComponent {
  private creating = false;
  public loadingCurrentGame: Observable<boolean>;
  public currentGame: Observable<Game>;


  constructor(private _gamesService: GamesService) {
    this.currentGame = _gamesService.currentGame;
    this.loadingCurrentGame = this.currentGame
      .map(g => g === undefined);
  }

  newGame() {
    this.creating = true;
    this._gamesService.newGame().catch(err =>
      console.error(err)
    ).then(() => {
      this.creating = false;
    });
  }
}
