import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ControllerResult} from "../dto/controller-result";
import {User} from "../entities/user";
import {LoginDto} from "../dto/login-dto";
import {UserDto} from "../dto/user-dto";
import {PasswordResetDto} from "../dto/password-reset-dto";
import {ReactivateDto} from "../dto/reactivate-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authController = environment.backendURL + '/auth';

  constructor(private http: HttpClient) { }

  public currentUser?: User;

  public login(login: LoginDto): Observable<ControllerResult<User>> {
    return this.http.post<ControllerResult<User>>(this.authController + '/login', login);
  }

  public register(user: UserDto): Observable<ControllerResult<User>> {
    return this.http.post<ControllerResult<User>>(this.authController + '/register', user);
  }

  public resetPassword(dto: PasswordResetDto): Observable<ControllerResult<User>> {
    return this.http.post<ControllerResult<User>>(this.authController + '/reset-password', dto);
  }

  public reactivate(dto: ReactivateDto): Observable<ControllerResult<User>> {
    return this.http.post<ControllerResult<User>>(this.authController + '/reactivate', dto);
  }
}
