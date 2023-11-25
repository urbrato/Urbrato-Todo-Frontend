import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activityController = environment.backendURL + '/confirm';

  constructor(private http: HttpClient) { }

  public confirm(uuid: string): Observable<any> {
    return this.http.get(`${this.activityController}/${uuid}`);
  }
}
