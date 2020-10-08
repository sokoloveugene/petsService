import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { SignUpPageComponent } from '../../pages/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: SignUpPageComponent }]),
  ],
  exports: [RouterModule],
})
export class SignUpPageModule {}
