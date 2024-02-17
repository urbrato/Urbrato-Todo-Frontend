import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Task} from "../entities/task";
import {TaskCreateDto} from "../dto/task-create-dto";
import {ControllerResult} from "../dto/controller-result";
import {TaskUpdateDto} from "../dto/task-update-dto";
import {TaskSearchDto} from "../dto/task-search-dto";
import {Page} from "../dto/page";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private controller = environment.backendURL + '/task';

  constructor(private http: HttpClient) { }

  public findById(id: number): Observable<Task> {
    return this.http.get<Task>(this.controller + '/find-view', {params: {id: id}});
  }

  public add(dto: TaskCreateDto): Observable<ControllerResult<Task>> {
    return this.http.post<ControllerResult<Task>>(this.controller + '/add', dto);
  }

  public update(dto: TaskUpdateDto): Observable<ControllerResult<Task>> {
    return this.http.patch<ControllerResult<Task>>(this.controller + '/update', dto);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.controller}/delete/${id}`);
  }

  public search(dto: TaskSearchDto): Observable<ControllerResult<Page<Task>>> {
    return this.http.post<ControllerResult<Page<Task>>>(this.controller + '/search-views', dto);
  }
}
