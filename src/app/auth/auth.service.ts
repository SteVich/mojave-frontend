import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';
import {Token} from "./model/token.model";
import {Registration} from "./model/registration.model";
import {HttpClient} from "@angular/common/http";
import {Login} from "./model/login.model";
import {ApiResponse} from "../common/models/apiResponse.model";

@Injectable({providedIn: 'root'})
export class AuthService {

  private options = {headers: {'Content-Type': 'application/json'}};
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              public jwtHelper: JwtHelperService,
              private http: HttpClient) {
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.loggedIn.next(!this.jwtHelper.isTokenExpired(token));
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      this.loggedIn.next(false);
      return false;
    }
  }

  registration(registrationObject: Registration): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.API_URL + '/auth/signup', registrationObject, this.options);
  }

  login(loginObject: Login): Observable<Token> {
    return this.http.post<Token>(environment.API_URL + '/auth/signin', loginObject, this.options);
  }

  loginViaGoogle(): void {
    window.open(environment.API_URL + '/google/login-with-google', '_self');
  }

  doesEmailExists(email: string): Observable<boolean> {
    let options = {
      headers: {'Content-Type': 'application/json'},
      params: {email: email}
    };
    return this.http.get<boolean>(environment.API_URL + '/auth/email-exists', options);
  }

  doesUsernameExists(username: string): Observable<boolean> {
    let options = {
      headers: {'Content-Type': 'application/json'},
      params: {username: username}
    };
    return this.http.get<boolean>(environment.API_URL + '/auth/username-exists', options);
  }

  setUserTokens(accessToken: string, refreshToken: string, userId: string): void {
    localStorage.setItem(`accessToken`, accessToken);
    localStorage.setItem(`refreshToken`, refreshToken);
    localStorage.setItem(`userId`, userId);
  }

  logout(): void {
    this.removeAuthorization();
    this.router.navigate(['/auth']);
  }

  removeAuthorization(): void {
    localStorage.removeItem(`accessToken`);
    localStorage.removeItem(`refreshToken`);
    localStorage.removeItem(`userId`);
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  getUserTokens(): Token {
    return {
      accessToken: localStorage.getItem(`accessToken`),
      refreshToken: localStorage.getItem(`refreshToken`),
      userId: localStorage.getItem(`userId`)
    }
  }

}
