import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {EditCategoryDlgData} from "./edit-category-dlg-data";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";
import {TranslateModule} from "@ngx-translate/core";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    TranslateModule,
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatLabel,
    NgIf,
    FormsModule,
    MatDialogActions,
    MatSlideToggle,
    MatButton
  ],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.css'
})
export class EditCategoryDialogComponent {
  constructor(
    private dlg: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: EditCategoryDlgData
  ) {
  }

  onFileSelected(event: any) {
    this.category.newIcon = event.target.files[0] ?? null;
    if (this.category.newIcon != null) {
      this.category.hasNullIcon = false;
    }
  }

  toggleNullifyIcon() {
    if (this.category.hasNullIcon) {
      this.category.newIcon = null;
    }
  }

  confirm() {
    this.dlg.close(new DialogReturn(DialogResult.OK, this.category));
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
