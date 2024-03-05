import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {NamedColorsEditDlgData} from "./named-colors-edit-dlg-data";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {ColorPickerModule} from "ngx-color-picker";

@Component({
  selector: 'app-named-colors-edit-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    TranslateModule,
    MatButton,
    ColorPickerModule,
    FormsModule
  ],
  templateUrl: './named-colors-edit-dialog.component.html',
  styleUrl: './named-colors-edit-dialog.component.css'
})
export class NamedColorsEditDialogComponent {
  constructor(
    private dlg: MatDialogRef<NamedColorsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NamedColorsEditDlgData
  ) {
  }

  confirm() {
    this.dlg.close(new DialogReturn(DialogResult.OK, this.data));
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
