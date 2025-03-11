import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from "rxjs";
import { environment } from "../../environments/environment";
import { ControllerResult } from "../dto/controller-result";
import { UserUpdateDto } from "../dto/user-update-dto";
import { User } from "../entities/user";
import { UserAvatar } from "../entities/user-avatar";
import { FileUtils } from "../util/file-utils";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileController = environment.backendURL + '/profile';

  constructor(private http: HttpClient) { }

  public updatePassword(password: string): Observable<any> {
    return this.http.post<ControllerResult<User>>(this.profileController + '/update-password', password);
  }

  public update(dto: UserUpdateDto): Observable<boolean> {
    return this.http.post<boolean>(this.profileController + '/update', dto);
  }

  public getCurrentUser(): Observable<User> {
    return this.http.post<User>(this.profileController + '/current', '');
  }

  public hasAvatar(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.profileController}/has-avatar?id=${id}`);
  }

  public getAvatarUrl(id: number): string {
    return `${this.profileController}/avatar?id=${id}`;
  }

  public setAvatar(id: number, file: File): Observable<string> {
    return from(FileUtils.readFileAsBase64(file)).pipe(
      switchMap(base64 => {
        const dto: UserAvatar = new UserAvatar();
        dto.id = id;
        dto.avatar = base64;

        return this.http.put(this.profileController + '/avatar', dto) as Observable<string>;
      }));
  }

  public removeAvatar(id: number): Observable<string> {
    const dto: UserAvatar = new UserAvatar();
    dto.id = id;
    dto.avatar = null;

    return this.http.put(this.profileController + '/avatar', dto) as Observable<string>;
  }
}
