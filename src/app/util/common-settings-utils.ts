import {LocalStorageUtils} from "./local-storage-utils";
import {AuthService} from "../service/auth.service";
import {User} from "../entities/user";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CommonSettingsUtils {
  private readonly TASK_WITHOUT_PRIORITY_BACK = 'cfgTaskWithoutPriorityBackgroundColor';
  private readonly TASK_WITHOUT_PRIORITY_FORE = 'cfgTaskWithoutPriorityForeColor';
  private readonly TASK_COMPLETED_BACK = 'cfgTaskCompletedBackgroundColor';
  private readonly TASK_COMPLETED_FORE = 'cfgTaskCompletedForeColor';

  private readonly defaultTaskWithoutPriorityBackColor = 'white';
  private readonly defaultTaskWithoutPriorityForeColor = 'black';
  private readonly defaultTaskCompletedBackColor = 'lightgray';
  private readonly defaultTaskCompletedForeColor = 'darkgray';

  user: User;

  public get taskWithoutPriorityBackColor(): string {
    return this.getColor(this.TASK_WITHOUT_PRIORITY_BACK, this.defaultTaskWithoutPriorityBackColor);
  }

  public set taskWithoutPriorityBackColor(value: string) {
    this.setColor(this.TASK_WITHOUT_PRIORITY_BACK, value);
  }

  public get taskWithoutPriorityForeColor(): string {
    return this.getColor(this.TASK_WITHOUT_PRIORITY_FORE, this.defaultTaskWithoutPriorityForeColor);
  }

  public set taskWithoutPriorityForeColor(value: string) {
    this.setColor(this.TASK_WITHOUT_PRIORITY_FORE, value);
  }

  public get taskCompletedBackColor(): string {
    return this.getColor(this.TASK_COMPLETED_BACK, this.defaultTaskCompletedBackColor);
  }

  public set taskCompletedBackColor(value: string) {
    this.setColor(this.TASK_COMPLETED_BACK, value);
  }

  public get taskCompletedForeColor(): string {
    return this.getColor(this.TASK_COMPLETED_FORE, this.defaultTaskCompletedForeColor);
  }

  public set taskCompletedForeColor(value: string) {
    this.setColor(this.TASK_COMPLETED_FORE, value);
  }

  constructor(
    srvAuth: AuthService
  ) {
    srvAuth.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  private getColor(name: string, initial: string): string {
    let color = initial;

    if (this.user === null) return initial;

    color = LocalStorageUtils.getObject<string>(name, this.user);

    if (color === null) return initial;

    return color;
  }

  private setColor(name: string, value: string) {
    if (this.user !== null)
      LocalStorageUtils.setObject<string>(name, this.user, value);
  }
}
