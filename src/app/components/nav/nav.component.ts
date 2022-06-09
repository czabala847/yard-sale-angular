import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  activeMenu: boolean = false;

  count: number = 0;
  private countSubs!: Subscription;

  constructor(private store: StoreService) {}

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
}
