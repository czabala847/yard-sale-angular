import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private cart: ProductInterface[] = [];
  private storeCart = new BehaviorSubject<ProductInterface[]>([]);
  private storeQuantityCart = new BehaviorSubject<number>(0);

  //definir observable
  storeCart$ = this.storeCart.asObservable();
  storeQuantityCart$ = this.storeQuantityCart.asObservable();

  constructor() {}

  addProduct(product: ProductInterface) {
    this.cart.push(product);

    //Todos los que esten suscritos, recibiran una notificación
    this.storeCart.next(this.cart);
    this.storeQuantityCart.next(this.getQuantityCart());
  }

  getCart() {
    return this.cart;
  }

  getQuantityCart() {
    return this.cart.length;
  }

  getTotalCart() {
    return this.cart.reduce((sum, product) => (sum += product.price), 0);
  }
}
