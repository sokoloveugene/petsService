import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { MenuLinksComponent } from './components/menu-links/menu-links.component';
import { ModalDoctorDataComponent } from './components/modal-doctor-data/modal-doctor-data.component';
import { NoRequestsPlaceholderComponent } from './components/no-requests-placeholder/no-requests-placeholder.component';
import { CartEmptyPlaceholderComponent } from './components/cart-empty-placeholder/cart-empty-placeholder.component';
import { NoUserRequestsPlaceholderComponent } from './components/no-user-requests-placeholder/no-user-requests-placeholder.component';
import { SpinerComponent } from './components/spiner/spiner.component';
import { YearsOfExperincePipe } from './pipes/years-of-experince.pipe';
import {AuthInterceptor} from "./auth.interceptor";
import { HomepagePlaceholderComponent } from './components/homepage-placeholder/homepage-placeholder.component';

const INTERCAPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor 
}

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
    FilterProductsPipe,
    CartItemComponent,
    CartPageComponent,
    MenuLinksComponent,
    ModalDoctorDataComponent,
    NoRequestsPlaceholderComponent,
    CartEmptyPlaceholderComponent,
    NoUserRequestsPlaceholderComponent,
    SpinerComponent,
    YearsOfExperincePipe,
    HomepagePlaceholderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [INTERCAPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
