import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  total: number = 0;
  quantity: number = 0;

  products: ProductInterface[] = [];
  productChosen: ProductInterface = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: '',
    },
    images: [],
  };
  showDetail: boolean = false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProductToCart(product: ProductInterface) {
    this.storeService.addProduct(product);
    this.quantity = this.storeService.getQuantityCart();
    this.total = this.storeService.getTotalCart();
  }

  handleProductShow(id: number) {
    this.productsService.getProduct(id).subscribe((data) => {
      this.toggleDetail();
      this.productChosen = data;
    });
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }
}
