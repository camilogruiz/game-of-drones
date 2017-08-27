import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ErrorHandlersService } from '../handlers/error-handlers.service';

@Injectable()
export class UserService {

  private usersUrl = '/api/users';

  constructor(
    private http: Http,
    public errorHandlersService: ErrorHandlersService
  ) { }

  // post("/api/users")
  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.usersUrl, newUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.errorHandlersService.handleError);
  }

  // put("/api/users/:id")
  updateUser(putUser: User): Promise<void | User> {
    const putUrl = this.usersUrl + '/' + putUser._id;
    return this.http.put(putUrl, putUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.errorHandlersService.handleError);
  }

}
