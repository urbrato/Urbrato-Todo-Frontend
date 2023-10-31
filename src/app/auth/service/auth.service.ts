import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ControllerResult} from "../../dto/controller-result";
import {User} from "../../entities/user";
import {LoginDto} from "../../dto/login-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authController = environment.backendURL + '/auth';

  constructor(private http: HttpClient) { }

  public login(login: LoginDto): Observable<ControllerResult<User>> {
    return this.http.post<ControllerResult<User>>(this.authController + '/login', login);
  }
}
