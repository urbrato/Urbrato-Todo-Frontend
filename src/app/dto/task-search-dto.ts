export class TaskSearchDto {
  public name?: string;
  public complete?: boolean;
  public dueDateFrom?: Date;
  public dueDateTo?: Date;
  public repeatAfterDays?: number;
  public createdFrom?: Date;
  public createdTo?: Date;
  public priorityId?: number;
  public categoryId?: number;

  public pageNumber?: number;
  public pageSize?: number;
  public sortColumn?: string;
  public sortDirection?: string;
}
