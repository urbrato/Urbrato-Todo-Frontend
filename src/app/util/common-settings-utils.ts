import {LocalStorageUtils} from "./local-storage-utils";
import {AuthService} from "../service/auth.service";
import {User} from "../entities/user";
import {Injectable} from "@angular/core";
import {LANG_RU} from "../main/main.component";

@Injectable({
  providedIn: 'root'
})
export class CommonSettingsUtils {
  private readonly TASK_WITHOUT_PRIORITY_BACK = 'cfgTaskWithoutPriorityBackgroundColor';
  private readonly TASK_WITHOUT_PRIORITY_FORE = 'cfgTaskWithoutPriorityForeColor';
  private readonly TASK_COMPLETED_BACK = 'cfgTaskCompletedBackgroundColor';
  private readonly TASK_COMPLETED_FORE = 'cfgTaskCompletedForeColor';
  private readonly UI_LANGUAGE = 'cfgLanguage';

  private readonly defaultTaskWithoutPriorityBackColor = 'white';
  private readonly defaultTaskWithoutPriorityForeColor = 'black';
  private readonly defaultTaskCompletedBackColor = 'lightgray';
  private readonly defaultTaskCompletedForeColor = 'darkgray';
  private readonly defaultLanguage = LANG_RU;

  user: User;

  public get taskWithoutPriorityBackColor(): string {
    return this.getStringValue(this.TASK_WITHOUT_PRIORITY_BACK, this.defaultTaskWithoutPriorityBackColor);
  }

  public set taskWithoutPriorityBackColor(value: string) {
    this.setStringValue(this.TASK_WITHOUT_PRIORITY_BACK, value);
  }

  public get taskWithoutPriorityForeColor(): string {
    return this.getStringValue(this.TASK_WITHOUT_PRIORITY_FORE, this.defaultTaskWithoutPriorityForeColor);
  }

  public set taskWithoutPriorityForeColor(value: string) {
    this.setStringValue(this.TASK_WITHOUT_PRIORITY_FORE, value);
  }

  public get taskCompletedBackColor(): string {
    return this.getStringValue(this.TASK_COMPLETED_BACK, this.defaultTaskCompletedBackColor);
  }

  public set taskCompletedBackColor(value: string) {
    this.setStringValue(this.TASK_COMPLETED_BACK, value);
  }

  public get taskCompletedForeColor(): string {
    return this.getStringValue(this.TASK_COMPLETED_FORE, this.defaultTaskCompletedForeColor);
  }

  public set taskCompletedForeColor(value: string) {
    this.setStringValue(this.TASK_COMPLETED_FORE, value);
  }

  public get language(): string {
    return this.getStringValue(this.UI_LANGUAGE, this.defaultLanguage);
  }

  public set language(value: string) {
    this.setStringValue(this.UI_LANGUAGE, value);
  }

  constructor(
    srvAuth: AuthService
  ) {
    srvAuth.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  private getStringValue(name: string, initial: string): string {
    let color = initial;

    if (this.user === null) return initial;

    color = LocalStorageUtils.getObject<string>(name, this.user);

    if (color === null) return initial;

    return color;
  }

  private setStringValue(name: string, value: string) {
    if (this.user !== null)
      LocalStorageUtils.setObject<string>(name, this.user, value);
  }
}
