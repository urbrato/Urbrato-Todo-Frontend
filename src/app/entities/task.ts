import {Priority} from "./priority";
import {Category} from "./category";

export class Task {
  public id?: number;
  public name?: string;
  public complete?: boolean;
  public dueDate?: Date;
  public repeatAfterDays?: number;
  public created?: Date;
  public priority?: Priority;
  public category?: Category;
}
