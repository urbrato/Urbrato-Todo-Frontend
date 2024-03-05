import {Component} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {Priority} from "../../entities/priority";
import {PriorityService} from "../../dao/priority.service";
import {PriorityComponent} from "../../views/priority/priority.component";
import {NamedSettingComponent} from "../../views/named-setting/named-setting.component";
import {CommonSettingsUtils} from "../../util/common-settings-utils";
import {NamedColorsEditDlgData} from "../named-colors-edit-dialog/named-colors-edit-dlg-data";
import {NamedColorsEditDialogComponent} from "../named-colors-edit-dialog/named-colors-edit-dialog.component";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatTabGroup,
        MatTab,
        TranslateModule,
        MatButton,
        NgForOf,
        PriorityComponent,
        NamedSettingComponent
    ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.css'
})
export class SettingsDialogComponent {
  priorities: Priority[];

  constructor(
    private srvPriority: PriorityService,
    private translate: TranslateService,
    public localSettings: CommonSettingsUtils,
    private bldDlg: MatDialog,
    private dlgEditColor: MatDialogRef<NamedColorsEditDialogComponent>,
    private dlg: MatDialogRef<SettingsDialogComponent>
  ) {
    srvPriority.list().subscribe({
      next: priorities => {
        this.priorities = priorities;
      }
    })
  }

  editTaskWithoutPriority() {
    const data = new NamedColorsEditDlgData();
    data.name = this.translate.instant('Task.WithoutPriority');
    data.backcolor = this.localSettings.taskWithoutPriorityBackColor;
    data.forecolor = this.localSettings.taskWithoutPriorityForeColor;

    this.dlgEditColor = this.bldDlg.open(NamedColorsEditDialogComponent, {
      data: data,
      width: '400px'
    });

    this.dlgEditColor.afterClosed().subscribe({
      next: (retVal: DialogReturn<NamedColorsEditDlgData>) => {
        if (retVal && retVal.result === DialogResult.OK) {
          this.localSettings.taskWithoutPriorityBackColor = retVal.data.backcolor;
          this.localSettings.taskWithoutPriorityForeColor = retVal.data.forecolor;
        }
      }
    })
  }

  onClose() {
    this.dlg.close();
  }
}
