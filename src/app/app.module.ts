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
import { AllRequestsComponent } from './components/all-requests/all-requests.component';
import { DoctorsAccountPageComponent } from './pages/doctors-account-page/doctors-account-page.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { ActiveAppointmentsComponent } from './components/active-appointments/active-appointments.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackHomeComponent } from './components/back-home/back-home.component';
import { ModalAppointmentComponent } from './components/modal-appointment/modal-appointment.component';
import { UserRequestComponent } from './components/user-request/user-request.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ShopProductComponent } from './components/shop-product/shop-product.component';
import { CreateProductPageComponent } from './pages/create-product-page/create-product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    AlertComponent,
    SignUpPageComponent,
    UserRequestsPageComponent,
    AllRequestsComponent,
    DoctorsAccountPageComponent,
    ProfileCardComponent,
    ProfileSettingsPageComponent,
    ActiveAppointmentsComponent,
    MenuComponent,
    BackHomeComponent,
    ModalAppointmentComponent,
    UserRequestComponent,
    ShopPageComponent,
    ShopProductComponent,
    CreateProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
