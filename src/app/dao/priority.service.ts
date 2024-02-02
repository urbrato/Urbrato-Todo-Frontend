import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {from, Observable, switchMap} from "rxjs";
import {Priority} from "../entities/priority";
import {PriorityCreateDto} from "../dto/priority-create-dto";
import {ControllerResult} from "../dto/controller-result";
import {PriorityUpdateDto} from "../dto/priority-update-dto";
import {PrioritySearchDto} from "../dto/priority-search-dto";
import {FileUtils} from "../util/file-utils";
import {PriorityIcon} from "../entities/priority-icon";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private controller = environment.backendURL + '/priority';

  constructor(private http: HttpClient) { }

  public findById(id: number): Observable<Priority> {
    return this.http.get<Priority>(this.controller + '/find', {params: {id: id}});
  }

  public list(): Observable<Priority[]> {
    return this.http.get<Priority[]>(this.controller + '/list');
  }

  public add(dto: PriorityCreateDto): Observable<ControllerResult<Priority>> {
    return this.http.post(this.controller + '/add', dto);
  }

  public update(dto: PriorityUpdateDto): Observable<ControllerResult<Priority>> {
    return this.http.patch(this.controller + '/update', dto);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete(`${this.controller}/delete/${id}`);
  }

  public search(dto: PrioritySearchDto): Observable<ControllerResult<Priority[]>> {
    return this.http.post<ControllerResult<Priority[]>>(this.controller + '/search', dto);
  }

  public getIconUrl(id: number): string {
    return `${this.controller}/icon?id=${id}`;
  }

  public setIcon(id: number, file: File): Observable<string> {
    return from(FileUtils.readFileAsBase64(file)).pipe(
      switchMap(base64 => {
        const dto: PriorityIcon = new PriorityIcon();
        dto.id = id;
        dto.icon = base64;

        return this.http.put(this.controller + '/icon', dto) as Observable<string>;
      }));
  }

  public removeIcon(id: number): Observable<string> {
    const dto: PriorityIcon = new PriorityIcon();
    dto.id = id;
    dto.icon = null;

    return this.http.put(this.controller + '/icon', dto) as Observable<string>;
  }
}
