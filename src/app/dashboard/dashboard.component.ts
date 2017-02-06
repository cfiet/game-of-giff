import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Game, GamesService } from '../firebase-backend';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private myGames: Observable<Game[]>;

  constructor(private _gamesService: GamesService) {
    this.myGames = _gamesService.myGames;
  }

  ngOnInit() {
  }

}
