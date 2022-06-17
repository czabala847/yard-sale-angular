import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ProductComponent } from './components/product/product.component';
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [ProductComponent, ImgComponent, ProductsComponent],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [ProductComponent, ImgComponent, ProductsComponent],
})
export class SharedModule {}
