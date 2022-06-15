import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  ProductInterface,
  ProductCreateDTOInterface,
  ProductUpdateDTOInterface,
} from '../models/product.model';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://young-sands-07814.herokuapp.com/api';

  private paginationParams(limit?: number, offset?: number) {
    let params: HttpParams = new HttpParams();

    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return params;
  }

  getProducts(limit?: number, offset?: number) {
    const params = this.paginationParams(limit, offset);
    return this.http.get<ProductInterface[]>(`${this.url}/products`, {
      params,
    });
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    const params = this.paginationParams(limit, offset);
    return this.http.get<ProductInterface[]>(
      `${this.url}/categories/${categoryId}/products`,
      { params }
    );
  }

  getProduct(id: string) {
    return this.http.get<ProductInterface>(`${this.url}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError('Algo fallo en el server!!!');
        }

        if (error.status === 404) {
          return throwError('Producto no existe!!!');
        }

        return throwError('Ups Ocurrio un error!!!');
      })
    );
  }

  create(dto: ProductCreateDTOInterface) {
    return this.http.post<ProductInterface>(this.url, dto);
  }

  update(id: string, dto: ProductUpdateDTOInterface) {
    return this.http.put<ProductInterface>(`${this.url}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.url}/products/${id}`);
  }
}
