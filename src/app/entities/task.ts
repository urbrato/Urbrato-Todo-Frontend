import {Priority} from "./priority";
import {Category} from "./category";

export class Task {
  public id?: number;
  public name?: string;
  public complete?: boolean;
  public dueDate?: Date;
  public repeatAfterDays?: number;
  public created?: Date;
  public priorityId?: number;
  public priorityName?: string;
  public importance?: number;
  public backcolor?: string;
  public forecolor?: string;
  public hasPriorityIcon: boolean;
  public categoryId?: number;
  public categoryName?: string;
  public hasCategoryIcon: boolean;
}
