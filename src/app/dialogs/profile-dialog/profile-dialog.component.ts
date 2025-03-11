import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { TranslateModule } from "@ngx-translate/core";
import { DialogResult } from 'src/app/util/dialog-result';
import { DialogReturn } from 'src/app/util/dialog-return';
import { ProfileDlgData } from './profile-dlg-data';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        TranslateModule,
        MatButton,
        MatLabel,
        MatInput,
        MatSlideToggle,
        MatFormField,
        CommonModule,
        FormsModule
    ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css'
})

export class ProfileDialogComponent {
  public pwd: string = '';
  public repwd: string = '';
  public pwdChangeAllowed: boolean = false;

  constructor(
    private readonly dlg: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDlgData
  ) {
  }

  allowChangePassword() {
    this.data.password = '';
    this.repwd = '';
    this.pwdChangeAllowed = true;
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
    if (!this.pwdChangeAllowed || (this.pwd == this.repwd)) {
      this.data.password = this.pwdChangeAllowed ? this.pwd : '';
      this.dlg.close(new DialogReturn(DialogResult.OK, this.data));
    }
  }

  cancel() {
    this.dlg.close(new DialogReturn(DialogResult.CANCEL));
  }
}
