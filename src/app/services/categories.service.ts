import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryInterface } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url: string =
    'https://young-sands-07814.herokuapp.com/api/categories';

  constructor(private http: HttpClient) {}

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<CategoryInterface[]>(this.url, { params });
  }
}
