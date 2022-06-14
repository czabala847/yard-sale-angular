import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password });
  }

  profile() {
    return this.http.get(`${this.url}/profile`);
  }
}
