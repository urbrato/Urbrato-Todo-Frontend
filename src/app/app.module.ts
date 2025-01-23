import { CommonModule, registerLocaleData } from "@angular/common";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule } from "@angular/common/http";
import localeEo from '@angular/common/locales/eo';
import localeRu from '@angular/common/locales/ru';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { RECAPTCHA_LOADER_OPTIONS, RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings } from "ng-recaptcha";
import { ColorPickerService } from "ngx-color-picker";
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { environment } from "../environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmFromMailComponent } from './auth/confirm-from-mail/confirm-from-mail.component';
import { InfoPageComponent } from './auth/info-page/info-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResendActivityComponent } from './auth/resend-activity/resend-activity.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { CategoryIconDemoComponent } from './demo/category-icon-demo/category-icon-demo.component';
import { UserReportComponent } from './demo/user-report/user-report.component';
import { ProfileDialogComponent } from './dialogs/profile-dialog/profile-dialog.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { CategoryCreateDto } from "./dto/category-create-dto";
import { WithCredentialsInterceptor } from "./interceptors/with-credentials.interceptor";
import { MainComponent } from './main/main.component';
import { CategoriesListComponent } from "./views/categories-list/categories-list.component";
import { CategoriesLogoComponent } from "./views/categories-logo/categories-logo.component";
import { CategoryComponent } from "./views/category/category.component";
import { HeaderComponent } from "./views/header/header.component";
import { StatCardComponent } from "./views/stat-card/stat-card.component";
import { StatComponent } from "./views/stat/stat.component";
import { TasksListComponent } from "./views/tasks-list/tasks-list.component";

registerLocaleData(localeRu);
registerLocaleData(localeEo);

function HttpLoaderFactory(http: HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {
      prefix: environment.frontendURL + '/assets/locales/',
      suffix: '.json'
    }
  ]);
}

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
    MatButton,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    CategoriesListComponent,
    CategoryComponent,
    CategoriesLogoComponent,
    HeaderComponent,
    StatCardComponent,
    StatComponent,
    TasksListComponent,
    ProfileDialogComponent
  ],
  providers: [
    MatDatepickerModule,
    ColorPickerService,
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
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: CategoryCreateDto,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
