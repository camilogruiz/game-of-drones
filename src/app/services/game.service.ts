import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ErrorHandlersService } from '../handlers/error-handlers.service';

@Injectable()
export class GameService {
  private gamesUrl = '/api/games';

  constructor(
    private http: Http,
    public errorHandlersService: ErrorHandlersService
  ) { }

  // post("/api/games")
  createGame(newGame: Game): Promise<void | Game> {
    return this.http.post(this.gamesUrl, newGame)
      .toPromise()
      .then(response => response.json() as Game)
      .catch(this.errorHandlersService.handleError);
  }

}
