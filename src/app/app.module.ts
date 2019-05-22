import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ContainerComponent } from './layout/container/container.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthModalComponent } from './layout/shared/auth/auth-modal/auth-modal.component';
import { LoginFormComponent } from './layout/shared/auth/login-form/login-form.component';
import { PassResetFormComponent } from './layout/shared/auth/pass-reset-form/pass-reset-form.component';
import { ForgotPassFormComponent } from './layout/shared/auth/forgot-pass-form/forgot-pass-form.component';
import { RegisterFormComponent } from './layout/shared/auth/register-form/register-form.component';
import { HomeComponent } from './routes-modules/home/home.component';
import { HomeMainContentComponent } from './routes-modules/home/home-layout/home-main-content/home-main-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent,
    AuthModalComponent,
    LoginFormComponent,
    PassResetFormComponent,
    ForgotPassFormComponent,
    RegisterFormComponent,
    HomeComponent,
    HomeMainContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    //AdminModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }, 
    DatePipe
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
