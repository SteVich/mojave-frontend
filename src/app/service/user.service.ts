import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/models/user.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private router: Router, private http: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.API_URL + '/user/current');
  }
}
