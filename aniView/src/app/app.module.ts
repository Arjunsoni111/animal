import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';


import { CryptoService } from './core/services/crypto.service';
import { HttpService } from './core/services/http';
import { AnimalService } from './core/services/animal.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppConfigModule } from './app-config.module';

export function httpInterceptor(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  crypto: CryptoService,
) {
  return new HttpService(backend, defaultOptions, crypto);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppConfigModule,
  ],
  providers: [
    AnimalService,
    CryptoService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [XHRBackend, RequestOptions, CryptoService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
