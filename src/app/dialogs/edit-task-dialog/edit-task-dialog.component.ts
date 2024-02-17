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
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryService} from "../../dao/category.service";
import {PriorityService} from "../../dao/priority.service";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule} from "@angular/material/core";

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
    MatDialogActions
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css'
})
export class EditTaskDialogComponent {
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
    this.data.dto.dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  confirm() {
    this.dlg.close(new DialogReturn(DialogResult.OK, this.data.dto));
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
