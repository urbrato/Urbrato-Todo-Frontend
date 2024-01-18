import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Stat} from "../entities/stat";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatServiceService {
  private controller = environment.backendURL + '/stat';

  constructor(private http: HttpClient) { }

  public getStat(id: number): Observable<Stat> {
    return this.http.get<Stat>(`${this.controller}/${id}`);
  }
}
