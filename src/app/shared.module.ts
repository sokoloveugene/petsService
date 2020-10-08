import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BackHomeComponent } from './components/back-home/back-home.component';
import { ShopProductComponent } from './components/shop-product/shop-product.component';
import { UserRequestComponent } from './components/user-request/user-request.component';

@NgModule({
  declarations: [BackHomeComponent, ShopProductComponent, UserRequestComponent],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    BackHomeComponent,
    ShopProductComponent,
    UserRequestComponent,
    CommonModule,
  ],
})
export class SharedModule {}
