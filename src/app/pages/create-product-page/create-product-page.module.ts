import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateProductPageComponent } from './create-product-page.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [CreateProductPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CreateProductPageComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class CreateProductPageModule {}
