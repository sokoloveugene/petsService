import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './routeGuards/auth.guard';
import { AuthInversionGuard } from './routeGuards/auth-inversion.guard';
import { DocGuard } from './routeGuards/doc.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';

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
    loadChildren: () =>
      import('./pages/user-requests-page/user-requests-page.module').then(
        (m) => m.UserRequestsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'all_requests',
    loadChildren: () =>
      import('./pages/doctors-account-page/doctors-account-page.module').then(
        (m) => m.DoctorsAccountPageModule
      ),
    canActivate: [AuthGuard, DocGuard],
  },
  {
    path: 'profile_settings',
    loadChildren: () =>
      import('./pages/profile-settings-page/profile-settings-page.module').then(
        (m) => m.ProfileSettingsPageModule
      ),
    canActivate: [AuthGuard, DocGuard],
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop-page/shop-page.module').then(
        (m) => m.ShopPageModule
      ),
  },
  {
    path: 'create_product',
    loadChildren: () =>
      import('./pages/create-product-page/create-product-page.module').then(
        (m) => m.CreateProductPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      ),
  },
  {path: "about", component: AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
