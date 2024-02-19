import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from "../../dto/page";
import {Task} from "../../entities/task";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe, formatDate, NgFor, NgIf} from "@angular/common";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../../dao/category.service";
import {PriorityService} from "../../dao/priority.service";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {EditTaskDialogComponent} from "../../dialogs/edit-task-dialog/edit-task-dialog.component";
import {EditTaskDlgData} from "../../dialogs/edit-task-dialog/edit-task-dlg-data";
import {DialogReturn} from "../../util/dialog-return";
import {Category} from "../../entities/category";
import {Priority} from "../../entities/priority";
import {TaskCreateDto} from "../../dto/task-create-dto";

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
    PaginationComponent,
    MatButton
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  txtNoCategory: string = '';
  txtNoPriority: string = '';
  txtNoDueDate: string = '';

  clrDefaultBack = 'white';
  clrDefaultTxt = 'black';
  clrCompleteBack = 'lightgray';
  clrCompleteTxt = 'darkgray';

  isMobile: boolean;

  @Input()
  tasks: Page<Task>;

  @Input()
  categories: Category[];

  @Input()
  priorities: Priority[];

  @Input()
  selectedCategory: Category;

  @Output()
  changePageEvent = new EventEmitter<number>();

  @Output()
  createTaskEvent = new EventEmitter<TaskCreateDto>();

  @Output()
  updateTaskEvent = new EventEmitter<TaskUpdateDto>();

  @Output()
  deleteTaskEvent = new EventEmitter<number>();

  constructor(
    private srvCategory: CategoryService,
    private srvPriority: PriorityService,
    private translate: TranslateService,
    private bldDlg: MatDialog,
    private dlgMsg: MatDialogRef<MessageBoxComponent>,
    private dlgEditTask: MatDialogRef<EditTaskDialogComponent>
  ) {
  }

  ngOnInit() {
    this.isMobile = DeviceInfo.IsMobile;
  }

  getPriorityBackColor(task: Task): string {
    if (task.complete) {
      return this.clrCompleteBack;
    } else {
      return task.backcolor ?? this.clrDefaultBack;
    }
  }

  getPriorityForeColor(task: Task): string {
    if (task.complete) {
      return this.clrCompleteTxt;
    } else {
      return task.forecolor ?? this.clrDefaultTxt;
    }
  }

  getPriorityValue(task: Task): number {
    return task.importance ?? 0;
  }

  getPriorityName(task: Task): string {
    if (task.priorityName === null) {
      if (this.txtNoPriority === '')
        this.txtNoPriority = this.translate.instant('Task.WithoutPriority');
      return this.txtNoPriority;
    }
    else
      return task.priorityName;
  }

  getPriorityIconUrl(task: Task): string {
    return this.srvPriority.getIconUrl(task.priorityId);
  }

  getCategoryName(task: Task): string {
    if (task.categoryName === null) {
      if (this.txtNoCategory === '')
        this.txtNoCategory = this.translate.instant('Task.WithoutCategory');
      return this.txtNoCategory;
    }
    else
      return task.categoryName;
  }

  getCategoryIconUrl(task: Task): string {
    return this.srvCategory.getIconUrl(task.categoryId);
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

  onAdd() {
    const dlgData = new EditTaskDlgData();
    dlgData.dlgTitle = this.translate.instant('Task.CreateTitle');
    dlgData.categories = this.categories;
    dlgData.priorities = this.priorities;

    dlgData.dto = new TaskCreateDto();
    dlgData.dto.name = '';
    dlgData.dto.complete = false;
    dlgData.dto.dueDate = null;
    if (this.selectedCategory !== null)
      dlgData.dto.categoryId = this.selectedCategory.id;
    dlgData.dto.priorityId = null;
    dlgData.dto.repeatAfterDays = null;

    this.dlgEditTask = this.bldDlg.open(EditTaskDialogComponent, {
      data: dlgData,
      width: '600px',
      maxHeight: '95vh;'
    });

    this.dlgEditTask.afterClosed().subscribe({
      next: (result: DialogReturn<TaskCreateDto>) => {
        if (result && result.result === DialogResult.OK) {
          this.createTaskEvent.emit(result.data);
        }
      }
    })
  }

  onEdit($event: Task) {
    const dlgData = new EditTaskDlgData();
    dlgData.dlgTitle = this.translate.instant('Task.EditTitle');
    dlgData.categories = this.categories;
    dlgData.priorities = this.priorities;

    const dtoDlg = new TaskUpdateDto();
    dtoDlg.id = $event.id;
    dtoDlg.name = $event.name;
    dtoDlg.complete = $event.complete;
    dtoDlg.dueDate = $event.dueDate;
    dtoDlg.categoryId = $event.categoryId;
    dtoDlg.priorityId = $event.priorityId;
    dtoDlg.repeatAfterDays = $event.repeatAfterDays;

    dlgData.dto = structuredClone(dtoDlg);

    this.dlgEditTask = this.bldDlg.open(EditTaskDialogComponent, {
      data: dlgData,
      width: '600px',
      maxHeight: '95vh;'
    });

    this.dlgEditTask.afterClosed().subscribe({
      next: (result: DialogReturn<TaskUpdateDto>) => {
        if (result && result.result === DialogResult.OK) {
          const dto = new TaskUpdateDto();
          dto.id = dtoDlg.id;

          if (dtoDlg.name !== result.data.name) {
            dto.name = result.data.name;
          }

          if (dtoDlg.complete !== result.data.complete) {
            dto.complete = result.data.complete;
          }

          if (dtoDlg.repeatAfterDays !== result.data.repeatAfterDays) {
            dto.repeatAfterDays = result.data.repeatAfterDays;
          }

          if (dtoDlg.priorityId !== result.data.priorityId) {
            dto.priorityId = result.data.priorityId ?? 0;
          }

          if (dtoDlg.categoryId !== result.data.categoryId) {
            dto.categoryId = result.data.categoryId ?? 0;
          }

          if (dtoDlg.dueDate !== result.data.dueDate) {
            dto.dueDate = result.data.dueDate;
          }

          this.updateTaskEvent.emit(dto);
        }
      }
    })
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
