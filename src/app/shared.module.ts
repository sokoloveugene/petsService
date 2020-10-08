import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BackHomeComponent} from "./components/back-home/back-home.component";
import { ShopProductComponent } from './components/shop-product/shop-product.component';

@NgModule({
  declarations: [BackHomeComponent, ShopProductComponent],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule, BackHomeComponent, ShopProductComponent],
})
export class SharedModule {}
