import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from "../../dto/page";
import {Task} from "../../entities/task";
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
import {TaskUpdateDto} from "../../dto/task-update-dto";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageBoxComponent} from "../../dialogs/message-box/message-box.component";
import {MessageBoxData} from "../../util/message-box-data";
import {MessageBoxButtons} from "../../util/message-box-buttons";
import {MessageBoxIcon} from "../../util/message-box-icon";
import {DialogResult} from "../../util/dialog-result";

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

  hasPriorityIcon = { };
  hasCategoryIcon = { };

  txtNoCategory: string = '';
  txtNoPriority: string = '';
  txtNoDueDate: string = '';

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

  @Output()
  changePageEvent = new EventEmitter<number>();

  @Output()
  updateTaskEvent = new EventEmitter<TaskUpdateDto>();

  @Output()
  deleteTaskEvent = new EventEmitter<number>();

  constructor(
    private srvCategory: CategoryService,
    private srvPriority: PriorityService,
    private translate: TranslateService,
    private bldDlg: MatDialog,
    private dlgMsg: MatDialogRef<MessageBoxComponent>
  ) {
  }

  ngOnInit() {
    this.isMobile = DeviceInfo.IsMobile;
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
    if (task.priority === null) {
      if (this.txtNoPriority === '')
        this.txtNoPriority = this.translate.instant('Task.WithoutPriority');
      return this.txtNoPriority;
    }
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
    if (task.category === null) {
      if (this.txtNoCategory === '')
        this.txtNoCategory = this.translate.instant('Task.WithoutCategory');
      return this.txtNoCategory;
    }
    else
      return task.category.name;
  }

  getHasCategoryIcon(task: Task) {
    if (task.category === null)
      this.hasCategoryIcon[task.id] = false;
    else {
      this.srvCategory.hasIcon(task.category.id).subscribe({
        next: result => {
          this.hasCategoryIcon[task.id] = result;
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
    if (task.dueDate === null) {
      if (this.txtNoDueDate === '')
        this.txtNoDueDate = this.translate.instant('Task.WithoutDueDate');
      return this.txtNoDueDate;
    }
    else
      return formatDate(task.dueDate, 'dd.MM.yyyy',
        this.translate.instant('Locale'));
  }

  changePage($event: number) {
    this.changePageEvent.emit($event);
  }

  onToggleComplete($event: Task) {
    const dto = new TaskUpdateDto();
    dto.id = $event.id;
    dto.complete = $event.complete;
    this.updateTaskEvent.emit(dto);
  }

  onDelete($event: Task) {
    const msgData = new MessageBoxData(
      this.translate.instant('Task.DeleteConfirm', {name: $event.name}),
      this.translate.instant('Task.DeleteTitle'),
      MessageBoxButtons.YesNo,
      MessageBoxIcon.QUESTION
    )

    this.dlgMsg = this.bldDlg.open(MessageBoxComponent, {
      data: msgData,
      width: '400px'
    })

    this.dlgMsg.afterClosed().subscribe({
      next: (retVal: DialogResult) => {
        if (retVal && retVal === DialogResult.YES) {
          this.deleteTaskEvent.emit($event.id);
        }
      }
    })
  }
}
