import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

import { UserInterface } from 'src/app/models/user.model';
import { CategoryInterface } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  private countSubs!: Subscription;
  public activeMenu: boolean = false;
  public count: number = 0;
  public profile: UserInterface | null = null;
  public categories: CategoryInterface[] = [];

  constructor(
    private store: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    //suscribiéndose al estado global que ofrece el servicio StoreService
    this.store.storeCart$.subscribe((products) => {
      this.count = products.length;
    });

    this.getAllCategories();
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

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
