import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product.model';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private limit: number = 10;
  private offset: number = 0;

  products: ProductInterface[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  handleLoadListener() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productsService
      .getProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
