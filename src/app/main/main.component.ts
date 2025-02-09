import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatDrawerMode } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Observable } from "rxjs";
import { CategoryService } from "../dao/category.service";
import { PriorityService } from "../dao/priority.service";
import { StatService } from "../dao/stat.service";
import { TaskService } from "../dao/task.service";
import { EditCategoryDlgData } from "../dialogs/edit-category-dialog/edit-category-dlg-data";
import { ProfileDialogComponent } from '../dialogs/profile-dialog/profile-dialog.component';
import { ProfileDlgData } from '../dialogs/profile-dialog/profile-dlg-data';
import { SettingsDialogComponent } from "../dialogs/settings-dialog/settings-dialog.component";
import { CategorySearchDto } from "../dto/category-search-dto";
import { Page } from "../dto/page";
import { TaskCreateDto } from "../dto/task-create-dto";
import { TaskSearchDto } from "../dto/task-search-dto";
import { TaskUpdateDto } from "../dto/task-update-dto";
import { Category } from "../entities/category";
import { Priority } from "../entities/priority";
import { Stat } from "../entities/stat";
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { AuthService } from "../service/auth.service";
import { ProfileService } from "../service/profile.service";
import { CommonSettingsUtils } from "../util/common-settings-utils";
import { DeviceInfo } from "../util/device-info";
import { DialogResult } from "../util/dialog-result";
import { DialogReturn } from '../util/dialog-return';
import { LocalStorageUtils } from "../util/local-storage-utils";
import { MessageBoxButtons } from '../util/message-box-buttons';
import { MessageBoxIcon } from '../util/message-box-icon';
import { ShowError } from "../util/show-error";

export const LANG_RU = 'ru';
export const LANG_EO = 'eo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  readonly FILTER_COOKIE = 'taskFilter';
  readonly SHOW_CATEGORIES_LIST = 'showCategoriesList';

  currentUser: User | null = null;

  // категории
  categories: Category[] = [];
  allCategories: Category[] = [];
  categoriesFilter: CategorySearchDto;
  selectedCategory: Category = null;

  // приоритеты
  priorities: Priority[] = [];

  // настройки боковой панели
  catsOpened: boolean = false; // открыто ли изначально
  catsMode: MatDrawerMode = "side"; // режим открытия

  // статистика
  stat: Stat;
  completed: number = 0;
  uncompleted: number = 0;

  // задачи
  tasks: Page<Task>;
  fltTasks: TaskSearchDto;
  dfltPageSize = 3;
  dfltPageNumber = 0;
  clrDefaultBack: string;
  clrDefaultTxt: string;
  clrCompleteBack: string;
  clrCompleteTxt: string;

  constructor(
    private srvAuth: AuthService,
    private srvProfile: ProfileService,
    private srvCategory: CategoryService,
    private srvPriority: PriorityService,
    private srvStat: StatService,
    private srvTask: TaskService,
    private commonSettings: CommonSettingsUtils,
    private router: Router,
    private deviceDetector: DeviceDetectorService,
    private translate: TranslateService,
    private showError: ShowError,
    private dlgSettings: MatDialogRef<SettingsDialogComponent>,
    private dlgProfile: MatDialogRef<ProfileDialogComponent>,
    private bldDlg: MatDialog) {

    this.detectDevice();
    this.translate.use(LANG_RU);

    srvAuth.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user === null) {
        this.categories = [];
      } else {
        this.initCatsDrawer();
        this.initSettings();

        this.getAllCategories();
        this.getPriorities();
        this.updateStats();

        this.fltTasks = new TaskSearchDto();
        this.initTaskFilter();
      }
    });

    this.currentUser = this.srvAuth.currentUser.value;
    if (this.currentUser == null) {
      this.srvProfile.getCurrentUser().subscribe({
        next: (user) => {
          this.srvAuth.currentUser.next(user);
        },
        error: (_) => {
          this.srvAuth.currentUser.next(null);
          this.router.navigate(['']).then(_ => {});
        }
      });
    }

    this.categoriesFilter = new CategorySearchDto();
    this.categoriesFilter.name = '';

    translate.addLangs([LANG_RU, LANG_EO]);
    translate.setDefaultLang(LANG_RU);
  }

  detectDevice() {
    DeviceInfo.IsMobile = this.deviceDetector.isMobile();
    DeviceInfo.IsTablet = this.deviceDetector.isTablet();
    DeviceInfo.IsDesktop = this.deviceDetector.isDesktop();
  }

  initCatsDrawer() {
    if (DeviceInfo.IsMobile) {
      this.catsOpened = false;
      this.catsMode = "over";
    } else {
      this.catsOpened = true;
      this.catsMode = "side";
    }

    const cats = LocalStorageUtils.getObject<boolean>(
      this.SHOW_CATEGORIES_LIST, this.currentUser);

    if (cats === null) {
      this.catsOpened = !DeviceInfo.IsMobile;
    } else {
      this.catsOpened = cats;
    }
  }

  initSettings() {
    this.clrDefaultBack = this.commonSettings.taskWithoutPriorityBackColor;
    this.clrDefaultTxt = this.commonSettings.taskWithoutPriorityForeColor;
    this.clrCompleteBack = this.commonSettings.taskCompletedBackColor;
    this.clrCompleteTxt = this.commonSettings.taskCompletedForeColor;

    this.translate.use(this.commonSettings.language);
  }

  showSettingsDialog(): Observable<DialogResult> {
    this.dlgSettings = this.bldDlg.open(SettingsDialogComponent, {
      width: '500px'
    });

    return this.dlgSettings.afterClosed();
  }

  showProfileDialog(): Observable<DialogReturn<ProfileDlgData>> {
    let data = new ProfileDlgData();
    data.hasNullIcon = true;
    data.newIcon = null;
    data.email = this.currentUser.email;
    data.waitingEmail = this.currentUser.activity?.additionalData;
    data.password = '';

    this.dlgProfile = this.bldDlg.open(ProfileDialogComponent, {
      data: data,
      width: '500px',
      height: 'auto',
    });

    return this.dlgProfile.afterClosed();
  }

  getFilteredCategories() {
    if (this.categoriesFilter?.name &&
      this.categoriesFilter.name.trim().length > 0) {
      this.srvCategory.search(this.categoriesFilter).subscribe({
        next: (categories) => {
          this.categories = categories.payload;
          this.updateSelectedCategory();
        },
        error: (err) => {
          this.showError.showError(err, 'Category');
        }
      })
    } else {
      this.categories = this.allCategories;
      this.updateSelectedCategory();
    }
  }

  getAllCategories() {
    this.srvCategory.list().subscribe({
      next: (categories) => {
        this.allCategories = categories;
        this.getFilteredCategories();
      }
    })
  }

  getPriorities() {
    this.srvPriority.list().subscribe({
      next: (priorities) => {
        this.priorities = priorities;
      }
    })
  }

  getStats() {
    this.srvStat.getStat(this.currentUser.id).subscribe({
      next: (stat) => {
        this.stat = stat;
        if (this.selectedCategory === null) {
          this.completed = stat.ncomplete;
          this.uncompleted = stat.nincomplete;
        }
      }
    })
  }

  getTasks() {
    if (this.fltTasks) {
      LocalStorageUtils.setObject(
        this.FILTER_COOKIE,
        this.currentUser,
        this.fltTasks);
      this.srvTask.search(this.fltTasks).subscribe({
        next: (tasks) => {
          this.tasks = tasks.payload;
        },
        error: (err) => {
          this.showError.showError(err, 'Task');
        }
      })
    }
  }

  initTaskFilter() {
    if (DeviceInfo.IsMobile)
      this.dfltPageSize = 5;
    else
      this.dfltPageSize = 10;

    this.fltTasks.pageSize = this.dfltPageSize;
    this.fltTasks.pageNumber = this.dfltPageNumber;

    const cookieFilter = LocalStorageUtils.getObject<TaskSearchDto>(
      this.FILTER_COOKIE,
      this.currentUser);

    if (cookieFilter === null) {
      this.fltTasks.name = '';
      this.fltTasks.complete = null;
      this.fltTasks.createdFrom = null;
      this.fltTasks.createdTo = null;
      this.fltTasks.dueDateFrom = null;
      this.fltTasks.dueDateTo = null;
      this.fltTasks.priorityId = null;
      this.fltTasks.categoryId = null;
      this.fltTasks.repeatAfterDays = null;
      this.fltTasks.sortColumn = 'created';
      this.fltTasks.sortDirection = 'ASC';
    } else {
      this.fltTasks.name = cookieFilter.name;
      this.fltTasks.complete = cookieFilter.complete;
      this.fltTasks.createdFrom = cookieFilter.createdFrom;
      this.fltTasks.createdTo = cookieFilter.createdTo;
      this.fltTasks.dueDateFrom = cookieFilter.dueDateFrom;
      this.fltTasks.dueDateTo = cookieFilter.dueDateTo;
      this.fltTasks.priorityId = cookieFilter.priorityId;
      this.fltTasks.categoryId = cookieFilter.categoryId;
      this.fltTasks.repeatAfterDays = cookieFilter.repeatAfterDays;
      this.fltTasks.sortColumn = cookieFilter.sortColumn;
      this.fltTasks.sortDirection = cookieFilter.sortDirection;
    }

    if (this.fltTasks.categoryId === null) {
      this.updateTaskFilter();
    } else {
      this.srvCategory.findById(this.fltTasks.categoryId).subscribe({
        next: (category: Category) => {
          this.selectCategory(category);
        },
        error: _ => {
          this.updateTaskFilter();
        }
      })
    }
  }

  updateTaskFilter() {
    const category = this.selectedCategory;

    if (category === null)
      this.fltTasks.categoryId = null;
    else
      this.fltTasks.categoryId = category.id;

    this.getTasks();
  }

  updateStats() {
    this.getStats();
    if (this.selectedCategory !== null) {
      this.completed = this.selectedCategory.ncomplete;
      this.uncompleted = this.selectedCategory.nincomplete;
    }
  }

  updateSelectedCategory() {
    if (this.selectedCategory !== null) {
      this.selectedCategory = this.categories.find(cat => cat.id === this.selectedCategory.id) ?? null;
    }
    this.updateStats();
  }

  addCategory(category) {
    this.srvCategory.add(category).subscribe( {
      next: _ =>  {
        this.getAllCategories();
      },
      error: err => {
        this.showError.showError(err, "Category");
      }
    });
  }

  editCategory($event: EditCategoryDlgData) {
    this.srvCategory.update($event.category).subscribe({
      next: (category) => {
        if (this.selectedCategory !== null && this.selectedCategory.id === $event.category.id) {
          this.selectCategory(category.payload);
        }
        if ($event.hasNullIcon) {
          this.srvCategory.removeIcon($event.category.id).subscribe({
            next: _ => {
              this.getAllCategories();
            },
            error: err => {
              this.showError.showError(err, "Category");
            }
          })
        } else if ($event.newIcon !== null) {
          this.srvCategory.setIcon($event.category.id, $event.newIcon).subscribe({
            next: _ => {
              this.getAllCategories();
            },
            error: err => {
              this.showError.showError(err, "Category");
            }
          })
        } else {
          this.getAllCategories();
        }
        if (this.selectedCategory === null || this.selectedCategory.id === this.fltTasks.categoryId) {
          this.getTasks();
        }
      },
      error: err => {
        this.showError.showError(err, "Category");
      }
    })
  }

  deleteCategory($event: number) {
    if (this.selectedCategory !== null && this.selectedCategory.id === $event) {
      this.selectCategory(null);
    }
    this.srvCategory.delete($event).subscribe({
      next: _ => {
        this.getAllCategories();
        this.getTasks();
      },
      error: err => {
        this.showError.showError(err, "Category");
      }
    })
  }

  searchCategories($event: CategorySearchDto) {
    this.getFilteredCategories();
  }

  selectCategory(category: Category) {
    const changed =
      ((category === null) !== (this.selectedCategory === null)) ||
      (category !== null && category.id !== this.selectedCategory.id);

    this.selectedCategory = category;

    if (changed) {
      this.updateStats();
      this.updateTaskFilter();
    }
  }

  changeTaskPage($event: number) {
    this.fltTasks.pageNumber = $event;
    this.getTasks();
  }

  addTask($event: TaskCreateDto) {
    this.srvTask.add($event).subscribe({
      next: _ => {
        this.getAllCategories();
        this.getTasks();
      },
      error: (err) => {
        this.showError.showError(err, 'Task');
      }
    })
  }

  editTask($event: TaskUpdateDto) {
    this.srvTask.update($event).subscribe({
      next: _ => {
        this.getAllCategories();
        this.getTasks();
      },
      error: (err) => {
        this.showError.showError(err, 'Task');
      }
    })
  }

  deleteTask($event: number) {
    this.srvTask.delete($event).subscribe({
      next: _ => {
        this.getAllCategories();
        this.getTasks();
      },
      error: (err) => {
        this.showError.showError(err, 'Task');
      }
    })
  }

  searchTasks($event: TaskSearchDto) {
    this.fltTasks = $event;
    this.getTasks();
  }

  toggleDrawer() {
    this.catsOpened = !this.catsOpened;
    LocalStorageUtils.setObject(
      this.SHOW_CATEGORIES_LIST,
      this.currentUser,
      this.catsOpened
    );
  }

  editSettings() {
    this.showSettingsDialog().subscribe({
      next: () => {
        this.initSettings();
        this.getPriorities();
        this.getTasks();
      }
    })
  }

  editProfile() {
    this.showProfileDialog().subscribe({
      next: (res) => {
        console.log(res);
        if (res.result == DialogResult.OK) {
          this.showError.showMessageBox(res.data.email, 'q', MessageBoxButtons.OK, MessageBoxIcon.INFORMATION);
          this.getTasks();
        }
      }
    })
  }
}
