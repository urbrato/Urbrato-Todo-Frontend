import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout', redirectTo: '', pathMatch: "full"},
  {path: 'index', redirectTo: '', pathMatch: "full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
