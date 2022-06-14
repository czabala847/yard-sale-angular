import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCreateDTOInterface, UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://young-sands-07814.herokuapp.com/api/users';

  create(dto: UserCreateDTOInterface) {
    return this.http.post<UserInterface>(this.url, dto);
  }

  getAll() {
    return this.http.get<UserInterface[]>(this.url);
  }
}
