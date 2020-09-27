import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { UserRequestsPageComponent } from './pages/user-requests-page/user-requests-page.component';
import { AllRequestsPageComponent } from './pages/all-requests-page/all-requests-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    AlertComponent,
    SignUpPageComponent,
    UserRequestsPageComponent,
    AllRequestsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
