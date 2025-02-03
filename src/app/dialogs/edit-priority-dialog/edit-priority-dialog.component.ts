import { CommonModule } from "@angular/common";
import { Component, Inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButton, MatIconButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatSlider, MatSliderThumb } from "@angular/material/slider";
import { TranslateModule } from "@ngx-translate/core";
import { BothColorsEditComponent } from "../../both-colors-edit/both-colors-edit.component";
import { DialogResult } from "../../util/dialog-result";
import { DialogReturn } from "../../util/dialog-return";
import { EditPriorityDlgData } from "./edit-priority-dlg-data";

@Component({
  selector: 'app-edit-priority-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    TranslateModule,
    MatInput,
    MatIcon,
    MatLabel,
    MatSuffix,
    MatIconButton,
    MatSlider,
    CommonModule,
    FormsModule,
    BothColorsEditComponent,
    MatDialogActions,
    MatSliderThumb,
    MatSlideToggle,
    MatButton
  ],
  templateUrl: './edit-priority-dialog.component.html',
  styleUrl: './edit-priority-dialog.component.css'
})
export class EditPriorityDialogComponent {
  constructor(
    private readonly dlg: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditPriorityDlgData
  ) {
  }

  onFileSelected(event: any) {
    this.data.newIcon = event.target.files[0] ?? null;
    if (this.data.newIcon != null) {
      this.data.hasNullIcon = false;
    }
  }

  toggleNullifyIcon() {
    if (this.data.hasNullIcon) {
      this.data.newIcon = null;
    }
  }

  confirm() {
    this.dlg.close(new DialogReturn(DialogResult.OK, this.data));
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
