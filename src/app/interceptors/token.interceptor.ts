import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

//Contexto del interceptor
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

//Funcion para habiliar el interceptor
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Evaluar si el interceptor esta activo
    //Para añadir el token en la cabecera
    if (request.context.get(CHECK_TOKEN)) {
      request = this.addToken(request);
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();

    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return authReq;
    }

    return request;
  }
}
