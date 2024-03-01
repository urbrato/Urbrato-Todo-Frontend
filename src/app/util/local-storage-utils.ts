import {User} from "../entities/user";

export class LocalStorageUtils {
  public static getObject<T>(name: string, user: User) {
    const json = localStorage.getItem(`${name}_${user.id}`);
    if (json === null) {
      return null;
    } else {
      return JSON.parse(json) as T;
    }
  }

  public static setObject<T>(name: string, user: User, value: T) {
    localStorage.setItem(`${name}_${user.id}`, JSON.stringify(value));
  }
}
