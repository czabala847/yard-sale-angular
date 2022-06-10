import { Component, OnInit } from '@angular/core';
import {
  ProductCreateDTOInterface,
  ProductInterface,
  ProductUpdateDTOInterface,
} from 'src/app/models/product.model';
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
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: '',
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

  handleProductShow(id: string) {
    this.productsService.getProduct(id).subscribe((data) => {
      this.toggleDetail();
      this.productChosen = data;
    });
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  handleCreate() {
    const product: ProductCreateDTOInterface = {
      title: 'Nuevo producto',
      price: 200,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed pellentesque tortor.',
      categoryId: 1,
      images: ['https://placeimg.com/640/480/any'],
    };

    this.productsService.create(product).subscribe((data) => {
      console.log(data);
      this.products.unshift(data);
    });
  }

  handleUpdate() {
    const product: ProductUpdateDTOInterface = {
      title: 'Cambiando el titulo.',
    };

    const idProduct: string = this.productChosen.id;

    this.productsService.update(idProduct, product).subscribe((data) => {
      console.log(data);

      const index = this.products.findIndex(
        (product) => product.id === idProduct
      );

      this.products[index] = data;
      this.productChosen = data;
    });
  }

  handleDelete() {
    const idProduct: string = this.productChosen.id;

    this.productsService.delete(idProduct).subscribe(() => {
      const index = this.products.findIndex(
        (product) => product.id === idProduct
      );

      this.products.splice(index, 1);
      this.showDetail = false;
    });
  }
}
