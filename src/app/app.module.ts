import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuLinksComponent } from './components/menu-links/menu-links.component';
import { SpinerComponent } from './components/spiner/spiner.component';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from './shared.module';

const INTERCAPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AlertComponent,
    MenuComponent,
    MenuLinksComponent,
    SpinerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [INTERCAPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
