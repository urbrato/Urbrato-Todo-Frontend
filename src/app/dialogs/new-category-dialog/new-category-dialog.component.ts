import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {CategoryCreateDto} from "../../dto/category-create-dto";
import {TranslateModule} from "@ngx-translate/core";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-new-category-dialog',
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
    MatDialogActions,
    MatButton,
    MatLabel,
    FormsModule,
    NgIf
  ],
  templateUrl: './new-category-dialog.component.html',
  styleUrl: './new-category-dialog.component.css'
})
export class NewCategoryDialogComponent {

  constructor(
    private dlg: MatDialogRef<NewCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public category: CategoryCreateDto
  ) {
    if (!category) {
      alert('null');
    } else
    {
      alert(category.name);
    }
  }

  confirm() {
    if (!this.category ||
      !this.category.name ||
      this.category.name.trim() === '') {
      return;
    } else {
      this.dlg.close(new DialogReturn(DialogResult.OK, this.category));
    }
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
