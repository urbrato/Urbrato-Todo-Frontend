import {Component, Input} from '@angular/core';
import {Page} from "../../dto/page";
import {Task} from "../../entities/task";
import {TaskSearchDto} from "../../dto/task-search-dto";
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatRow,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe, NgIf} from "@angular/common";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../../dao/category.service";
import {PriorityService} from "../../dao/priority.service";
import {retry} from "rxjs";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatCheckbox,
    MatHeaderRow,
    MatRow
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  tasks: Page<Task>;
  filter: TaskSearchDto;

  displayedColumns: string[] = ['#', 'name', 'created', 'dueDate', 'priority', 'category', 'actions'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  txtNoCategory: string;
  txtNoPriority: string;

  clrDefaultBack = 'white';
  clrDefaultTxt = 'black';
  clrCompleteBack = 'lightgray';
  clrCompleteTxt = 'darkgray';

  @Input()
  isMobile: boolean;

  @Input('tasks')
  set setTasks(tasks: Page<Task>) {
    this.tasks = tasks;
    this.assignTableSource();
  }

  @Input('filter')
  set setFilter(filter: TaskSearchDto) {
    this.filter = filter;
  }

  constructor(
    private srvCategory: CategoryService,
    private srvPriority: PriorityService,
    private translate: TranslateService
  ) {
    this.initTranslations();
  }

  initTranslations() {
    this.txtNoCategory = this.translate.instant("Task.WithoutCategory");
    this.txtNoPriority = this.translate.instant("Task.WithoutPriority");
  }

  assignTableSource() {
    if (!this.dataSource) return;

    this.dataSource.data = this.tasks.content;
  }

  getPriorityBackColor(task: Task): string {
    if (task.complete) {
      return this.clrCompleteBack;
    } else if (task.priority !== null) {
      return '#' + task.priority.backcolor;
    } else {
      return this.clrDefaultBack;
    }
  }

  getPriorityForeColor(task: Task): string {
    if (task.complete) {
      return this.clrCompleteTxt;
    } else if (task.priority !== null) {
      return '#' + task.priority.forecolor;
    } else {
      return this.clrDefaultTxt;
    }
  }

  getPriorityValue(task: Task): number {
    if (task.priority === null)
      return 0;
    else
      return task.priority.importance;
  }

  getPriorityName(task: Task): string {
    if (task.priority === null)
      return '';
    else
      return task.priority.name;
  }

  getHasPriorityIcon(task: Task): boolean {
    if (task.priority === null)
      return false;
    else {
      this.srvPriority.hasIcon(task.priority.id).subscribe({
        next: result => {
          return result;
        },
        error: _ => {
          return false;
        }
      })
    }
  }

  getPriorityIconUrl(task: Task): string {
    if (task.priority === null)
      return '';
    else
      return this.srvPriority.getIconUrl(task.priority.id);
  }

  getCategoryName(task: Task): string {
    if (task.category === null)
      return '';
    else
      return task.category.name;
  }

  getHasCategoryIcon(task: Task): boolean {
    if (task.category === null)
      return false;
    else {
      this.srvCategory.hasIcon(task.category.id).subscribe({
        next: result => {
          return result;
        },
        error: _ => {
          return false;
        }
      })
    }
  }

  getCategoryIconUrl(task: Task): string {
    if (task.category === null)
      return '';
    else
      return this.srvCategory.getIconUrl(task.category.id);
  }
}
