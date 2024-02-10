import {Component, OnInit} from '@angular/core';
import {User} from "../entities/user";
import {AuthService} from "../service/auth.service";
import {ProfileService} from "../service/profile.service";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";
import {MatDrawerMode} from "@angular/material/sidenav";
import {TranslateService} from "@ngx-translate/core";
import {Category} from "../entities/category";
import {CategoryService} from "../dao/category.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageBoxComponent} from "../dialogs/message-box/message-box.component";
import {MessageBoxData} from "../util/message-box-data";
import {MessageBoxButtons} from "../util/message-box-buttons";
import {MessageBoxIcon} from "../util/message-box-icon";
import {Observable} from "rxjs";
import {DialogResult} from "../util/dialog-result";
import {DeviceInfo} from "../util/device-info";
import {EditCategoryDlgData} from "../dialogs/edit-category-dialog/edit-category-dlg-data";
import {CategorySearchDto} from "../dto/category-search-dto";
import {StatService} from "../dao/stat.service";
import {Page} from "../dto/page";
import {TaskService} from "../dao/task.service";
import {Task} from "../entities/task";
import {TaskSearchDto} from "../dto/task-search-dto";

export const LANG_RU = 'ru';
export const LANG_EO = 'eo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUser: User | null = null;

  // категории
  categories: Category[] = [];
  categoriesFilter: CategorySearchDto;
  selectedCategory: Category = null;

  // настройки боковой панели
  catsOpened: boolean = false; // открыто ли изначально
  catsMode: MatDrawerMode = "side"; // режим открытия

  // статистика
  completed: number = 0;
  uncompleted: number = 0;

  // задачи
  tasks: Page<Task>;
  fltTasks: TaskSearchDto;
  dfltPageSize = 3;
  dfltPageNumber = 0;

  constructor(
    private srvAuth: AuthService,
    private srvProfile: ProfileService,
    private srvCategory: CategoryService,
    private srvStat: StatService,
    private srvTask: TaskService,
    private router: Router,
    private deviceDetector: DeviceDetectorService,
    private translate: TranslateService,
    private dlgMsg: MatDialogRef<MessageBoxComponent>,
    private bldDlg: MatDialog) {

    srvAuth.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user === null) {
        this.categories = [];
      } else {
        this.getCategories();
        this.updateStats();

        this.fltTasks = new TaskSearchDto();
        this.initTaskFilter(null);
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

  ngOnInit(): void {
    this.detectDevice();
    this.initCatsDrawer();
    this.translate.use(LANG_RU);
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
  }

  showMessageBox(
    message: string,
    title: string,
    buttons: MessageBoxButtons,
    icon: MessageBoxIcon
  ): Observable<DialogResult> {
    let data = new MessageBoxData(
      message,
      title,
      buttons,
      icon
    );

    this.dlgMsg = this.bldDlg.open(MessageBoxComponent, {
      data: data,
      width: '400px'
    });

    return this.dlgMsg.afterClosed();
  }

  showError(err, controller) {
    if (err.error.code) {
      this.showMessageBox(
        this.translate.instant(`${controller}.ErrorCodes.${err.error.code}`),
        this.translate.instant('Main.Error'),
        MessageBoxButtons.OK,
        MessageBoxIcon.ERROR
      )
    } else if (err.status == 401) {
      this.router.navigate(['']).then(_ => {});
    } else {
      this.showMessageBox(
        this.translate.instant('Main.Error'),
        this.translate.instant('Main.Error'),
        MessageBoxButtons.OK,
        MessageBoxIcon.ERROR
      )
    }
  }

  getCategories() {
    if (this.categoriesFilter &&
      this.categoriesFilter.name &&
      this.categoriesFilter.name.trim().length > 0) {
      this.srvCategory.search(this.categoriesFilter).subscribe({
        next: (categories) => {
          this.categories = categories.payload;
        },
        error: (err) => {
          this.showError(err, 'Category');
        }
      })
    } else {
      this.srvCategory.list().subscribe({
        next: (categories) =>
          this.categories = categories
      })
    }
  }

  getStats() {
    this.srvStat.getStat(this.currentUser.id).subscribe({
      next: (stat) => {
        this.completed = stat.ncomplete;
        this.uncompleted = stat.nincomplete;
      }
    })
  }

  getTasks() {
    if (this.fltTasks) {
      this.srvTask.search(this.fltTasks).subscribe({
        next: (tasks) => {
          this.tasks = tasks.payload;
        },
        error: (err) => {
          this.showError(err, 'Task');
        }
      })
    }
  }

  initTaskFilter(category: Category) {
    this.fltTasks.pageSize = this.dfltPageSize;
    this.fltTasks.pageNumber = this.dfltPageNumber;

    this.updateTaskFilter(category);
  }

  updateTaskFilter(category: Category) {
    if (category === null)
      this.fltTasks.categoryId = null;
    else
      this.fltTasks.categoryId = category.id;

    this.getTasks();
  }

  updateStats() {
    if (this.selectedCategory == null) {
      this.getStats();
    } else {
      this.completed = this.selectedCategory.ncomplete;
      this.uncompleted = this.selectedCategory.nincomplete;
    }
  }

  addCategory(category) {
    this.srvCategory.add(category).subscribe( {
      next: _ =>  {
        this.getCategories();
      },
      error: err => {
        this.showError(err, "Category");
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
              this.getCategories();
            },
            error: err => {
              this.showError(err, "Category");
            }
          })
        } else if ($event.newIcon !== null) {
          this.srvCategory.setIcon($event.category.id, $event.newIcon).subscribe({
            next: _ => {
              this.getCategories();
            },
            error: err => {
              this.showError(err, "Category");
            }
          })
        } else {
          this.getCategories();
        }
      },
      error: err => {
        this.showError(err, "Category");
      }
    })
  }

  deleteCategory($event: number) {
    if (this.selectedCategory !== null && this.selectedCategory.id === $event) {
      this.selectCategory(null);
    }
    this.srvCategory.delete($event).subscribe({
      next: _ => {
        this.getCategories();
      },
      error: err => {
        this.showError(err, "Category");
      }
    })
  }

  searchCategories($event: CategorySearchDto) {
    this.getCategories();
  }

  selectCategory(category: Category) {
    const changed =
      ((category === null) !== (this.selectedCategory === null)) ||
      (category !== null && category.id !== this.selectedCategory.id);

    this.selectedCategory = category;

    if (changed) {
      this.updateStats();
      this.updateTaskFilter(category);
    }
  }

  changeTaskPage($event: number) {
    this.fltTasks.pageNumber = $event;
    this.getTasks();
  }

  toggleDrawer() {
    this.catsOpened = !this.catsOpened;
  }
}
