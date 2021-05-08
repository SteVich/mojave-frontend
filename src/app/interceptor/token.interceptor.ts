import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { accessToken, refreshToken } = this.auth.getUserTokens();

    request = request.clone({
   /*   setHeaders: {
        'access-token': accessToken,
        'refresh-token': refreshToken
      }*/
    });
    return next.handle(request);
  }
}
