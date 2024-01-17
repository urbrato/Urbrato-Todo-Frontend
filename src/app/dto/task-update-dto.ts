export class TaskUpdateDto {
  public id?: number;
  public name?: string;
  public complete?: boolean;
  public dueDate?: Date;
  public repeatAfterDays?: number;
  public priorityId?: number;
  public categoryId?: number;
}
