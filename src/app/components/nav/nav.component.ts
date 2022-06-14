import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { UserInterface } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  activeMenu: boolean = false;

  count: number = 0;
  private countSubs!: Subscription;

  profile: UserInterface | null = null;

  constructor(private store: StoreService, private authService: AuthService) {}

  ngOnInit(): void {
    //suscribiéndose al estado global que ofrece el servicio StoreService
    this.store.storeCart$.subscribe((products) => {
      this.count = products.length;
    });
  }

  ngOnDestroy(): void {
    this.countSubs.unsubscribe();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .login('carlos@example.com', '112233')
      .pipe(switchMap(() => this.authService.profile()))
      .subscribe(
        (profile) => {
          this.profile = profile;
          console.log(this.profile);
        },
        (error) => {
          alert(`Ocurrio un error ${error.message}`);
        }
      );
  }
}
