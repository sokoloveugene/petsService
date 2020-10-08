import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartEmptyPlaceholderComponent } from '../../components/cart-empty-placeholder/cart-empty-placeholder.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    CartPageComponent,
    CartItemComponent,
    CartEmptyPlaceholderComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: CartPageComponent }]),
  ],
  exports: [RouterModule],
})
export class CartPageModule {}
