import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ShopPageComponent } from './shop-page.component';
import { FilterProductsPipe } from '../../pipes/filter-products.pipe';

@NgModule({
  declarations: [ShopPageComponent, FilterProductsPipe],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ShopPageComponent }]),
  ],
  exports: [RouterModule],
})
export class ShopPageModule {}
