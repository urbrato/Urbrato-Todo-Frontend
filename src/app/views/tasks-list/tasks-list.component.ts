import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from "../../dto/page";
import {Task} from "../../entities/task";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../../dao/category.service";
import {PriorityService} from "../../dao/priority.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {DeviceInfo} from "../../util/device-info";
import {AbstractControl, FormControl, FormGroup, FormsModule} from "@angular/forms";
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
import {DueDatePipe} from "../../pipes/due-date.pipe";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TaskSearchDto} from "../../dto/task-search-dto";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

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
    MatButton,
    DueDatePipe,
    MatFormField,
    MatInput,
    MatSuffix,
    MatSelect,
    MatOption
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  animations: [
    trigger('taskFilterArea', [
      state(
        'show', style({
          height: '*',
          opacity: '1'
        })
      ),
      state(
        'hide', style({
          height: '0',
          opacity: '0'
        })
      ),
      transition('* => *', animate('300ms ease-in-out'))
    ])
  ]})
export class TasksListComponent implements OnInit{
  readonly iconAsc = 'arrow_upward';
  readonly iconDesc = 'arrow_downward';
  readonly defaultSortCol = 'created';

  txtNoCategory: string = '';
  txtNoPriority: string = '';
  txtNoDueDate: string = '';

  clrDefaultBack = 'white';
  clrDefaultTxt = 'black';
  clrCompleteBack = 'lightgray';
  clrCompleteTxt = 'darkgray';

  isMobile: boolean;

  gotFilter: TaskSearchDto;
  curFilter: TaskSearchDto;
  filterChanged: boolean;

  sortIcon: String;
  dueDateRangeForm: FormGroup;
  createdDateRangeForm: FormGroup;

  showFilter: Boolean = false;
  animationState: String = 'hide';

  @Input()
  tasks: Page<Task>;

  @Input('taskFilter')
  set setTaskFilter(dto: TaskSearchDto) {
    this.curFilter = dto;
    this.gotFilter = structuredClone(dto);
    this.filterChanged = false;

    this.dueDateFrom.setValue(dto.dueDateFrom);
    this.dueDateTo.setValue(dto.dueDateTo);

    this.createdDateFrom.setValue(dto.createdFrom);
    this.createdDateTo.setValue(dto.createdTo);

    this.setSortIconName();
  }

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

  @Output()
  searchEvent = new EventEmitter<TaskSearchDto>();

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

  get dueDateFrom(): AbstractControl {
    return this.dueDateRangeForm.get('dateFrom');
  }

  get dueDateTo(): AbstractControl {
    return this.dueDateRangeForm.get('dateTo');
  }

  get createdDateFrom(): AbstractControl {
    return this.createdDateRangeForm.get('dateFrom');
  }

  get createdDateTo(): AbstractControl {
    return this.createdDateRangeForm.get('dateTo');
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

  changePage($event: number) {
    this.changePageEvent.emit($event);
  }

  initDateRangeForm() {
    this.dueDateRangeForm = new FormGroup<any>({
      dateFrom: new FormControl(),
      dateTo: new FormControl()
    });

    this.createdDateRangeForm = new FormGroup<any>({
      dateFrom: new FormControl(),
      dateTo: new FormControl()
    });

    this.dueDateFrom.valueChanges.subscribe(() => this.checkFilterChanged());
    this.dueDateTo.valueChanges.subscribe(() => this.checkFilterChanged());

    this.createdDateFrom.valueChanges.subscribe(() => this.checkFilterChanged());
    this.createdDateTo.valueChanges.subscribe(() => this.checkFilterChanged());
  }

  checkFilterChanged() {
    if (this.gotFilter === null || this.curFilter === null) {
      this.filterChanged = false;
    } else if (this.gotFilter.name !== this.curFilter.name) {
      this.filterChanged = true;
    } else if (this.gotFilter.complete !== this.curFilter.complete) {
      this.filterChanged = true;
    } else if (this.gotFilter.priorityId !== this.curFilter.priorityId) {
      this.filterChanged = true;
    } else if (this.gotFilter.dueDateFrom !== this.curFilter.dueDateFrom) {
      this.filterChanged = true;
    } else if (this.gotFilter.dueDateTo !== this.curFilter.dueDateTo) {
      this.filterChanged = true;
    } else if (this.gotFilter.repeatAfterDays !== this.curFilter.repeatAfterDays) {
      this.filterChanged = true;
    } else if (this.gotFilter.createdFrom !== this.curFilter.createdFrom) {
      this.filterChanged = true;
    } else if (this.gotFilter.createdTo !== this.curFilter.createdTo) {
      this.filterChanged = true;
    } else if (this.gotFilter.sortColumn !== this.curFilter.sortColumn) {
      this.filterChanged = true;
    } else if (this.gotFilter.sortDirection !== this.curFilter.sortDirection) {
      this.filterChanged = true;
    } else {
      this.filterChanged = false;
    }
  }

  setSortIconName() {
    if (this.curFilter.sortDirection === 'DESC') {
      this.sortIcon = this.iconDesc;
    } else {
      this.sortIcon = this.iconAsc;
    }
  }

  toggleSortDirection() {
    if (this.curFilter.sortDirection === 'DESC') {
      this.curFilter.sortDirection = 'ASC';
    } else {
      this.curFilter.sortDirection = 'DESC';
    }
    this.setSortIconName();
  }

  onToggleComplete($event: Task) {
    const dto = new TaskUpdateDto();
    dto.id = $event.id;
    dto.complete = $event.complete;
    this.updateTaskEvent.emit(dto);
  }

  onToggleSearch() {
    this.showFilter = !this.showFilter;
    if (this.showFilter) {
      this.animationState = 'show';
    } else {
      this.animationState = 'hide';
    }
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

  onSearch() {
    this.gotFilter = structuredClone(this.curFilter);
    this.filterChanged = false;
    this.searchEvent.emit(this.curFilter);
  }
}
