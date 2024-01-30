import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MessageBoxData} from "../../util/message-box-data";
import {MessageBoxIcon} from "../../util/message-box-icon";
import {environment} from "../../../environments/environment";
import {DialogResult} from "../../util/dialog-result";
import {MatFormField} from "@angular/material/form-field";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MessageBoxButtons} from "../../util/message-box-buttons";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-message-box-component',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatDialogActions,
    NgIf,
    MatButton,
    NgForOf
  ],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {
  hasIcon: boolean;
  iconUrl: string;
  message: string;
  title: string;
  hasButton: boolean[];
  buttonResult: DialogResult[];
  buttonText: string[];

  constructor(
    private dlg: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) data: MessageBoxData,
    private translate: TranslateService
  ) {
    this.hasIcon = data.icon !== MessageBoxIcon.NONE;
    switch (data.icon) {
      case MessageBoxIcon.ERROR:
        this.iconUrl = environment.frontendURL + '/assets/img/error.png';
        break;
      case MessageBoxIcon.INFORMATION:
        this.iconUrl = environment.frontendURL + '/assets/img/information.png';
        break;
      case MessageBoxIcon.WARNING:
        this.iconUrl = environment.frontendURL + '/assets/img/warning.png';
        break;
      case MessageBoxIcon.QUESTION:
        this.iconUrl = environment.frontendURL + '/assets/img/question.png';
        break;
      default:
        this.iconUrl = '';
        break;
    }
    this.message = data.message;
    this.title = data.title;
    switch (data.buttons) {
      case MessageBoxButtons.AbortRetryIgnore:
        this.hasButton = [true, true, true];
        this.buttonResult = [
          DialogResult.ABORT,
          DialogResult.RETRY,
          DialogResult.IGNORE
        ];
        this.buttonText = [
          translate.instant('Main.Abort'),
          translate.instant('Main.Retry'),
          translate.instant('Main.Ignore')
        ];
        break;
      case MessageBoxButtons.OK:
        this.hasButton = [false, false, true];
        this.buttonResult = [
          DialogResult.NONE,
          DialogResult.NONE,
          DialogResult.OK
        ];
        this.buttonText = [
          '',
          '',
          translate.instant('Main.OK')
        ];
        break;
      case MessageBoxButtons.OkCancel:
        this.hasButton = [false, true, true];
        this.buttonResult = [
          DialogResult.NONE,
          DialogResult.OK,
          DialogResult.CANCEL
        ];
        this.buttonText = [
          '',
          translate.instant('Main.OK'),
          translate.instant('Main.Cancel')
        ];
        break;
      case MessageBoxButtons.RetryCancel:
        this.hasButton = [false, true, true];
        this.buttonResult = [
          DialogResult.NONE,
          DialogResult.RETRY,
          DialogResult.CANCEL
        ];
        this.buttonText = [
          '',
          translate.instant('Main.Retry'),
          translate.instant('Main.Cancel')
        ];
        break;
      case MessageBoxButtons.YesNo:
        this.hasButton = [false, true, true];
        this.buttonResult = [
          DialogResult.NONE,
          DialogResult.YES,
          DialogResult.NO
        ];
        this.buttonText = [
          '',
          translate.instant('Main.Yes'),
          translate.instant('Main.No')
        ];
        break;
      case MessageBoxButtons.YesNoCancel:
        this.hasButton = [true, true, true];
        this.buttonResult = [
          DialogResult.YES,
          DialogResult.NO,
          DialogResult.CANCEL
        ];
        this.buttonText = [
          translate.instant('Main.Yes'),
          translate.instant('Main.No'),
          translate.instant('Main.Cancel')
        ];
        break;
      default:
        this.hasButton = [];
        this.buttonResult = [];
        this.buttonText = [];
    }
  }

  getResult(result: DialogResult) {
    this.dlg.close(result);
  }
}
