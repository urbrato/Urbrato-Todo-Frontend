import {Role} from "./role";
import {Activity} from "./activity";

export class User {
  public id?: number;
  public login?: string;
  public email?: string;
  public name?: string;
  public roles?: Role[];
  public activity?: Activity;
}
