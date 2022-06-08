import { Component, OnInit, Input } from '@angular/core';
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
    name: '',
    price: 0,
    image: '',
  };

  ngOnInit(): void {}
}
