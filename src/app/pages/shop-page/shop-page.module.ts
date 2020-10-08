import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ShopPageComponent } from './shop-page.component';
import { ShopProductComponent } from '../../components/shop-product/shop-product.component';
import { BackHomeComponent } from '../../components/back-home/back-home.component';
import { CommonModule } from '@angular/common';
import {FilterProductsPipe} from "../../pipes/filter-products.pipe";

@NgModule({
  declarations: [ShopPageComponent,FilterProductsPipe],
  imports: [
    CommonModule, 
    SharedModule,
    RouterModule.forChild([{ path: '', component: ShopPageComponent }]),
  ],
  exports: [RouterModule],
})
export class ShopPageModule {}
