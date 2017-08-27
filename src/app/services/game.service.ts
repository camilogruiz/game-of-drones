import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ErrorHandlersService } from '../handlers/error-handlers.service';
import { PlayService } from './play.service';

@Injectable()
export class GameService {
  private gamesUrl = '/api/games';

  constructor(
    private http: Http,
    public errorHandlersService: ErrorHandlersService,
    public playService: PlayService
  ) { }

  saveGame(): Promise<void | boolean> {
    return this.http.post(this.gamesUrl, this.playService.objPlay)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.errorHandlersService.handleError);
  }
}
