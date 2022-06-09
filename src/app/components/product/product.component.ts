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
    category: '',
    image: '',
  };

  @Output() productAdd = new EventEmitter<ProductInterface>();

  ngOnInit(): void {}

  addToCart() {
    this.productAdd.emit(this.product);
  }
}
