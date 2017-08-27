import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Round } from './../models/round';
import { Move } from '../models/move';
import { User } from '../models/user';
import { Game } from '../models/game';
import { UserService } from './user.service';
import { RoundService } from './round.service';

import { ErrorHandlersService } from '../handlers/error-handlers.service';
import { PlayService } from './play.service';

@Injectable()
export class GameService {
  private gamesUrl = '/api/games';

  constructor(
    private http: Http,
    public errorHandlersService: ErrorHandlersService,
    public playService: PlayService,
    private userService: UserService,
    private roundService: RoundService
  ) { }

  // post("/api/games")
  createGame(newGame: Game): Promise<void | Game> {
    return this.http.post(this.gamesUrl, newGame)
      .toPromise()
      .then(response => response.json() as Game)
      .catch(this.errorHandlersService.handleError);
  }

  public save(): Promise<boolean> {
    const game = new Game();
    let count = 0;
    return new Promise((resolve, reject) => {
      this.userService.createUser(this.playService.objPlay.user1).then((user1: User) => {
        game.userID1 = user1._id;
        this.userService.createUser(this.playService.objPlay.user2).then((user2: User) => {
          game.userID2 = user2._id;
          // tslint:disable-next-line:no-shadowed-variable
          this.createGame(game).then((game: Game) => {
            this.playService.objPlay.scores.forEach(round => {
              // tslint:disable-next-line:no-shadowed-variable
              this.roundService.createRound(round).then((round: Round) => {
                count++;
                if (this.playService.objPlay.scores.length === count) {
                  this.playService.cleanData();
                  resolve(true);
                }
              });
            });
          });
        });
      });
    });
  }

}
