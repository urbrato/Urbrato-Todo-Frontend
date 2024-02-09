import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../dto/page";
import {Task} from "../../entities/task";
import {TaskSearchDto} from "../../dto/task-search-dto";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe, formatDate, NgFor, NgIf} from "@angular/common";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../../dao/category.service";
import {PriorityService} from "../../dao/priority.service";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {DeviceInfo} from "../../util/device-info";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../../pagination/pagination.component";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TranslateModule,
    MatSort,
    DatePipe,
    MatIconButton,
    MatIcon,
    MatCheckbox,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  tasks: Page<Task>;
  filter: TaskSearchDto;

  hasPriorityIcon = { };
  hasCategoryIcon = { };

  txtNoCategory: string;
  txtNoPriority: string;

  clrDefaultBack = 'white';
  clrDefaultTxt = 'black';
  clrCompleteBack = 'lightgray';
  clrCompleteTxt = 'darkgray';

  isMobile: boolean;

  @Input('tasks')
  set setTasks(tasks: Page<Task>) {
    this.tasks = tasks;

    this.hasPriorityIcon = {};
    this.hasCategoryIcon = {};

    if (tasks && tasks.content) {
      tasks.content.forEach((t: Task) => {
        this.getHasCategoryIcon(t);
        this.getHasPriorityIcon(t);
      });
    }
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

  ngOnInit() {
    this.isMobile = DeviceInfo.IsMobile;
  }

  initTranslations() {
    this.txtNoCategory = this.translate.instant("Task.WithoutCategory");
    this.txtNoPriority = this.translate.instant("Task.WithoutPriority");
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

  getHasPriorityIcon(task: Task) {
    if (task.priority === null)
      this.hasPriorityIcon[task.id] = false;
    else {
      this.srvPriority.hasIcon(task.priority.id).subscribe({
        next: result => {
          this.hasPriorityIcon[task.id] = result;
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

  getHasCategoryIcon(task: Task) {
    if (task.category === null)
      this.hasCategoryIcon[task.id] = false;
    else {
      this.srvCategory.hasIcon(task.category.id).subscribe({
        next: result => {
          this.hasCategoryIcon[task.id] = true;
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

  getDueDateFormat(task: Task): string {
    if (task.dueDate === null)
      return this.translate.instant('Task.WithoutDueDate');
    else
      return formatDate(task.dueDate, 'dd.MM.yyyy',
        this.translate.instant('Locale'));
  }

  changePage($event: number) {
    console.log($event);
  }
}
