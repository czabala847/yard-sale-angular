import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private cart: ProductInterface[] = [];

  constructor() {}

  addProduct(product: ProductInterface) {
    this.cart.push(product);
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
