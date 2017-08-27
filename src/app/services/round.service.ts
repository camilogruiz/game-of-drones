import { Injectable } from '@angular/core';
import { Round } from '../models/round';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ErrorHandlersService } from '../handlers/error-handlers.service';

@Injectable()
export class RoundService {
  private roundsUrl = '/api/rounds';

  constructor(
    private http: Http,
    public errorHandlersService: ErrorHandlersService
  ) { }

    // get("/api/groups)
    getGroupRound(): Promise<void | Round[]> {
      return this.http.get('/api/groups')
        .toPromise()
        .then(response => response.json() as Round[])
        .catch(this.errorHandlersService.handleError);
    }
}
