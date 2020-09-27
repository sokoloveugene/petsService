import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { UserRequestsPageComponent } from './pages/user-requests-page/user-requests-page.component';
import { AuthGuard } from './routeGuards/auth.guard';
import { AuthInversionGuard } from './routeGuards/auth-inversion.guard';
import { AllRequestsPageComponent } from './pages/all-requests-page/all-requests-page.component';
import { DocGuard } from './routeGuards/doc.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthInversionGuard],
  },
  {
    path: 'sign_up',
    component: SignUpPageComponent,
    canActivate: [AuthInversionGuard],
  },
  {
    path: 'user_requests',
    component: UserRequestsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all_requests',
    component: AllRequestsPageComponent,
    canActivate: [AuthGuard, DocGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
