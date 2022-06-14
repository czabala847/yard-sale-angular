import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthInterface } from '../models/auth.mode';
import { UserInterface } from '../models/user.model';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthInterface>(`${this.url}/login`, {
        email,
        password,
      })
      .pipe(
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

  profile(token: string) {
    return this.http.get<UserInterface>(`${this.url}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
