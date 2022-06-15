import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { TokenService } from './token.service';

import { AuthInterface } from '../models/auth.mode';
import { UserInterface } from '../models/user.model';

import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthInterface>(`${this.url}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          //Antes de enviar la respuesta guardar el token en localStorage
          this.tokenService.setToken(response.access_token);
        }),
        catchError((error: HttpErrorResponse) => {
          const errorDetail = {
            error: true,
            name: error.name,
            message: error.message,
          };

          return throwError(errorDetail);
        })
      );
  }

  profile() {
    return this.http.get<UserInterface>(`${this.url}/profile`, {
      context: checkToken(),
    });
  }
}
