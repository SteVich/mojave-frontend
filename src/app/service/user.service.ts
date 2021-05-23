import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/models/user.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../common/models/apiResponse.model";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private router: Router, private http: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.API_URL + '/user/current');
  }

  updateInfo(userId: number, request:User): Observable<ApiResponse> {
    console.log(request)
    return this.http.put<ApiResponse>(environment.API_URL + '/user/' + userId, request);
  }
}
