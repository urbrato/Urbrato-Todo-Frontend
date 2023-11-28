import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ControllerResult} from "../dto/controller-result";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileController = environment.backendURL + '/profile';

  constructor(private http: HttpClient) { }

  public updatePassword(password: string): Observable<any> {
    return this.http.post<ControllerResult<User>>(this.profileController + '/update-password', password, {withCredentials: true});
  }
}
