import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import {RECAPTCHA_LOADER_OPTIONS, RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import { MustMatchDirective } from './directives/must-match.directive';
import { InfoPageComponent } from './auth/info-page/info-page.component';
import { ConfirmFromMailComponent } from './auth/confirm-from-mail/confirm-from-mail.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { ResendActivityComponent } from './auth/resend-activity/resend-activity.component';
import { UserReportComponent } from './demo/user-report/user-report.component';
import {WithCredentialsInterceptor} from "./interceptors/with-credentials.interceptor";
import { CategoryIconDemoComponent } from './demo/category-icon-demo/category-icon-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ResetPasswordComponent,
    MustMatchDirective,
    InfoPageComponent,
    ConfirmFromMailComponent,
    UpdatePasswordComponent,
    ResendActivityComponent,
    UserReportComponent,
    CategoryIconDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButton
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {siteKey: '6Le9iEAkAAAAADUn4jwOXZ74kksw18JxYjFBGIYD' as RecaptchaSettings}
    },
    {
      provide: RECAPTCHA_LOADER_OPTIONS,
      useValue: {
        onBeforeLoad(url) {
          (url as URL).searchParams.set("hl", "ru-RU")

          return {url};
        }
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
