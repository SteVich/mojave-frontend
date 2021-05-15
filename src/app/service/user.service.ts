import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/models/user.model";
import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private router: Router, private http: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return of(new User(1, "SteVi"));
  }
}
