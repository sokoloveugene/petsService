import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from '../../pages/login-page/login-page.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: LoginPageComponent }]),
  ],
  exports: [RouterModule],
})
export class LoginPageModule {}
