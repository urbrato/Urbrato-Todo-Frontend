import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../entities/category";
import {CategoryCreateDto} from "../dto/category-create-dto";
import {ControllerResult} from "../dto/controller-result";
import {CategoryUpdateDto} from "../dto/category-update-dto";
import {CategorySearchDto} from "../dto/category-search-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private controller = environment.backendURL + '/category';

  constructor(private http: HttpClient) { }

  public findById(id: number): Observable<Category> {
    return this.http.get<Category>(this.controller + '/find', {params: {id: id}});
  }

  public list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.controller + '/list');
  }

  public add(dto: CategoryCreateDto): Observable<ControllerResult<Category>> {
    return this.http.post<ControllerResult<Category>>(this.controller + '/add', dto);
  }

  public update(dto: CategoryUpdateDto): Observable<ControllerResult<Category>> {
    return this.http.patch<ControllerResult<Category>>(this.controller + '/update', dto);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(this.http + '/delete/' + id.toString());
  }

  public search(dto: CategorySearchDto): Observable<Category[]> {
    return this.http.post<Category[]>(this.controller + '/search', dto);
  }

  public getIconUrl(id: number): string {
    return `${this.controller}/icon?id=${id}`;
  }

  public setIcon(id: string, file: File): void {
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('icon', file, file.name);

    const mudemo: demo = new demo();
    mudemo.id = parseInt(id);

    this.readFileAsBase64(file).then(base64 => {alert('q'); mudemo.icon = base64 as string;});

    alert('icon: ' + mudemo.icon);

    this.http.put(this.controller + '/icon',
      mudemo).subscribe({
      next: () => {
        alert('OK');
      },
      error: (err) => {
        if (err.error.message === undefined) {
          alert(err.message);
        } else {
          alert(err.error.message);
        }
      }
    });
  }

  readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = (reader.result as string)!.split(',')[1];
        resolve(base64);
      };

      reader.onerror = error => reject(error);

      reader.readAsDataURL(file);
    });
  }
}

class demo {
  public id?: number;
  public icon?: string;
}
