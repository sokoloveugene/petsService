import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { UserRequestsPageComponent } from './pages/user-requests-page/user-requests-page.component';
import { AuthGuard } from './routeGuards/auth.guard';
import { AuthInversionGuard } from './routeGuards/auth-inversion.guard';
import { DoctorsAccountPageComponent } from './pages/doctors-account-page/doctors-account-page.component';
import { DocGuard } from './routeGuards/doc.guard';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { CreateProductPageComponent } from './pages/create-product-page/create-product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
    canActivate: [AuthInversionGuard],
  },
  {
    path: 'sign_up',
    loadChildren: () =>
      import('./pages/sign-up-page/sign-up-page.module').then(
        (m) => m.SignUpPageModule
      ),
    canActivate: [AuthInversionGuard],
  },
  {
    path: 'user_requests',
    component: UserRequestsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all_requests',
    component: DoctorsAccountPageComponent,
    canActivate: [AuthGuard, DocGuard],
  },
  {
    path: 'profile_settings',
    component: ProfileSettingsPageComponent,
    canActivate: [AuthGuard, DocGuard],
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop-page/shop-page.module').then(
        (m) => m.ShopPageModule
      ),
  },
  { path: 'create_product', component: CreateProductPageComponent },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
