export class TaskCreateDto {
  public name?: string;
  public complete?: boolean;
  public dueDate?: Date;
  public repeatAfterDays?: number;
  public priorityId?: number;
  public categoryId?: number;
}
