import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ProductInterface,
  ProductCreateDTOInterface,
  ProductUpdateDTOInterface,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://young-sands-07814.herokuapp.com/api/products';

  getProducts() {
    return this.http.get<ProductInterface[]>(this.url);
  }

  getProduct(id: string) {
    return this.http.get<ProductInterface>(`${this.url}/${id}`);
  }

  create(dto: ProductCreateDTOInterface) {
    return this.http.post<ProductInterface>(this.url, dto);
  }

  update(id: string, dto: ProductUpdateDTOInterface) {
    return this.http.put<ProductInterface>(`${this.url}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
