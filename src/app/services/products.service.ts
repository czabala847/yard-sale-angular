import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://young-sands-07814.herokuapp.com/api/products';

  getProducts() {
    return this.http.get<ProductInterface[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<ProductInterface>(`${this.url}/${id}`);
  }
}
