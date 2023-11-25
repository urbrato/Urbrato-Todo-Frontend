import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {MainComponent} from "./main/main.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {InfoPageComponent} from "./auth/info-page/info-page.component";
import {ConfirmFromMailComponent} from "./auth/confirm-from-mail/confirm-from-mail.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo: '', pathMatch: "full"},
  {path: 'index', redirectTo: '', pathMatch: "full"},
  {path: 'main', component: MainComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'auth/reset-password', component: ResetPasswordComponent},
  {path: 'auth/info-page', component: InfoPageComponent},
  {path: 'confirm-activation/:uuid', component: ConfirmFromMailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
