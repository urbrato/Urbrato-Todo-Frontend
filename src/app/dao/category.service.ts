import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {from, Observable, switchMap} from "rxjs";
import {Category} from "../entities/category";
import {CategoryCreateDto} from "../dto/category-create-dto";
import {ControllerResult} from "../dto/controller-result";
import {CategoryUpdateDto} from "../dto/category-update-dto";
import {CategorySearchDto} from "../dto/category-search-dto";
import {FileUtils} from "../util/file-utils";
import {CategoryIcon} from "../entities/category-icon";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private controller = environment.backendURL + '/category';

  constructor(private http: HttpClient) { }

  public findById(id: number): Observable<Category> {
    return this.http.get<Category>(this.controller + '/find-view', {params: {id: id}});
  }

  public list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.controller + '/list-views');
  }

  public add(dto: CategoryCreateDto): Observable<ControllerResult<Category>> {
    return this.http.post<ControllerResult<Category>>(this.controller + '/add', dto);
  }

  public update(dto: CategoryUpdateDto): Observable<ControllerResult<Category>> {
    return this.http.patch<ControllerResult<Category>>(this.controller + '/update', dto);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.controller}/delete/${id}`);
  }

  public search(dto: CategorySearchDto): Observable<ControllerResult<Category[]>> {
    return this.http.post<ControllerResult<Category[]>>(this.controller + '/search-views', dto);
  }

  public getIconUrl(id: number): string {
    return `${this.controller}/icon?id=${id}`;
  }

  public setIcon(id: number, file: File): Observable<string> {
    return from(FileUtils.readFileAsBase64(file)).pipe(
      switchMap(base64 => {
      const dto: CategoryIcon = new CategoryIcon();
      dto.id = id;
      dto.icon = base64;

      return this.http.put(this.controller + '/icon', dto) as Observable<string>;
    }));
  }

  public removeIcon(id: number): Observable<string> {
    const dto: CategoryIcon = new CategoryIcon();
    dto.id = id;
    dto.icon = null;

    return this.http.put(this.controller + '/icon', dto) as Observable<string>;
  }
}
