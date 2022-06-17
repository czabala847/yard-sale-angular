import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userAuth: UserInterface | null = null;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.getToken();

    // console.log('Ejecutando canActive');

    // this.authService.storeProfile$.subscribe((user) => (this.userAuth = user));

    // if (!this.userAuth) {
    //   this.router.navigate(['home']);
    //   return false;
    // }

    // return true;

    if (!token) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
