import { Injectable } from '@angular/core';
import { Move } from '../models/move';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ErrorHandlersService } from '../handlers/error-handlers.service';

@Injectable()
export class MoveService {
  private movesUrl = '/api/moves';

  constructor(
    private http: Http,
    public errorHandlersService: ErrorHandlersService
  ) { }

  // get("/api/moves")
  getMoves(): Promise<void | Move[]> {
    return this.http.get(this.movesUrl)
      .toPromise()
      .then(response => response.json() as Move[])
      .catch(this.errorHandlersService.handleError);
  }

  // post("/api/moves")
  createMove(newMove: Move): Promise<void | Move> {
    return this.http.post(this.movesUrl, newMove)
      .toPromise()
      .then(response => response.json() as Move)
      .catch(this.errorHandlersService.handleError);
  }

  // delete("/api/moves/:id")
  deleteMove(delMoveId: String): Promise<void | String> {
    return this.http.delete(this.movesUrl + '/' + delMoveId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorHandlersService.handleError);
  }

  // put("/api/moves/:id")
  updateMove(putMove: Move): Promise<void | Move> {
    const putUrl = this.movesUrl + '/' + putMove._id;
    return this.http.put(putUrl, putMove)
      .toPromise()
      .then(response => response.json() as Move)
      .catch(this.errorHandlersService.handleError);
  }

}
