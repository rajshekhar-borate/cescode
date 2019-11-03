import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { fakeBackendProvider } from './shared/interceptors/helpers/fake-backend';
import { HttpErrorInterceptorProvider } from './shared/interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    fakeBackendProvider,
    HttpErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
