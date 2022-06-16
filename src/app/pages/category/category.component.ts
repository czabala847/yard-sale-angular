import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInterface } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private categoryId: string | null = null;
  private limit: number = 10;
  private offset: number = 0;
  private prevCategoryId: string | null = null;
  private changeUrlCategory: boolean = false;

  public products: ProductInterface[] = [];
  public productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('product');
          return this.route.paramMap;
        }),
        switchMap((params) => {
          this.categoryId = params.get('id');

          if (this.categoryId) {
            if (this.prevCategoryId === null) {
              this.prevCategoryId = this.categoryId;
            }

            //Detectar cuando se cambia de categoria
            this.changeUrlCategory = this.prevCategoryId !== this.categoryId;

            //Si la categoria cambia resetear el offset
            if (this.changeUrlCategory) {
              this.prevCategoryId = this.categoryId;
              this.offset = 0;
            }

            return this.productsService.getByCategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }

          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }

  handleLoadListener() {
    if (this.categoryId) {
      this.offset += this.limit;
      this.productsService
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
        });
    }
  }
}
