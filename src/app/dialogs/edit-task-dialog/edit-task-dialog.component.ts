import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {EditTaskDlgData} from "./edit-task-dlg-data";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryService} from "../../dao/category.service";
import {PriorityService} from "../../dao/priority.service";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule} from "@angular/material/core";
import {DeviceInfo} from "../../util/device-info";
import {addDays} from "date-fns";

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    TranslateModule,
    MatInput,
    MatIcon,
    MatLabel,
    NgIf,
    MatSuffix,
    MatIconButton,
    MatSelect,
    MatOption,
    NgForOf,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButton,
    MatDialogActions,
    NgClass
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css'
})
export class EditTaskDialogComponent {
  isMobile = DeviceInfo.IsMobile;

  constructor(
    private dlg: MatDialogRef<EditTaskDialogComponent>,
    public srvCategory: CategoryService,
    public srvPriority: PriorityService,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskDlgData
  ) {
    this.dateAdapter.setLocale(this.translate.instant('Locale'));
  }

  setDueDateFromNow(days: number) {
    this.data.dto.dueDate = addDays(new Date(), days);
  }

  confirm() {
    this.dlg.close(new DialogReturn(DialogResult.OK, this.data.dto));
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
