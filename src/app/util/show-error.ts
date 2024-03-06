import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageBoxComponent} from "../dialogs/message-box/message-box.component";
import {MessageBoxButtons} from "./message-box-buttons";
import {MessageBoxIcon} from "./message-box-icon";
import {Observable} from "rxjs";
import {DialogResult} from "./dialog-result";
import {MessageBoxData} from "./message-box-data";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ShowError {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private dlgMsg: MatDialogRef<MessageBoxComponent>,
    private bldDlg: MatDialog
  ) {

  }

  public showMessageBox(
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

  public showError(err, controller) {
    if (err.error.code) {
      this.showMessageBox(
        this.translate.instant(`${controller}.ErrorCodes.${err.error.code}`),
        this.translate.instant('Main.Error'),
        MessageBoxButtons.OK,
        MessageBoxIcon.ERROR
      )
    } else if (err.error.message) {
      this.showMessageBox(
        err.error.message,
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
}
