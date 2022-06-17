import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor() {}

  @Input() product: ProductInterface = {
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

  @Output() productAdd = new EventEmitter<ProductInterface>();
  @Output() productShow = new EventEmitter<string>();

  ngOnInit(): void {}

  //Enviar información al padre
  addToCart() {
    this.productAdd.emit(this.product);
  }

  //Enviar información al padre
  handleDetail() {
    this.productShow.emit(this.product.id);
  }
}
