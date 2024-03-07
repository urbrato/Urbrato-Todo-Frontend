import {Component} from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatIcon} from "@angular/material/icon";
import {EditPriorityDlgData} from "../edit-priority-dialog/edit-priority-dlg-data";
import {PriorityCreateDto} from "../../dto/priority-create-dto";
import {EditPriorityDialogComponent} from "../edit-priority-dialog/edit-priority-dialog.component";
import {ShowError} from "../../util/show-error";
import {PriorityUpdateDto} from "../../dto/priority-update-dto";
import {MessageBoxButtons} from "../../util/message-box-buttons";
import {MessageBoxIcon} from "../../util/message-box-icon";

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
    NamedSettingComponent,
    MatIcon,
    MatIconButton
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
    private showError: ShowError,
    private bldDlg: MatDialog,
    private dlgEditColor: MatDialogRef<NamedColorsEditDialogComponent>,
    private dlgEditPriority: MatDialogRef<EditPriorityDialogComponent>,
    private dlg: MatDialogRef<SettingsDialogComponent>
  ) {
    this.getPriorities();
  }

  getPriorities() {
    this.srvPriority.list().subscribe({
      next: priorities => {
        this.priorities = priorities;
      },
      error: (err) => this.showError.showError(err, 'Priority')
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

  editTaskCompleted() {
    const data = new NamedColorsEditDlgData();
    data.name = this.translate.instant('Task.States.Completed');
    data.backcolor = this.localSettings.taskCompletedBackColor;
    data.forecolor = this.localSettings.taskCompletedForeColor;

    this.dlgEditColor = this.bldDlg.open(NamedColorsEditDialogComponent, {
      data: data,
      width: '400px'
    });

    this.dlgEditColor.afterClosed().subscribe({
      next: (retVal: DialogReturn<NamedColorsEditDlgData>) => {
        if (retVal && retVal.result === DialogResult.OK) {
          this.localSettings.taskCompletedBackColor = retVal.data.backcolor;
          this.localSettings.taskCompletedForeColor = retVal.data.forecolor;
        }
      }
    })
  }

  onPriorityAdd() {
    const data = new EditPriorityDlgData();
    data.dlgTitle = this.translate.instant('Priority.CreateTitle');
    data.exists = false;
    data.newIcon = null;
    data.hasNullIcon = false;
    const dto = new PriorityCreateDto();
    dto.name = '';
    dto.importance = 50;
    dto.backcolor = '#ffffff';
    dto.forecolor = '#000000';
    data.dto = dto;

    this.dlgEditPriority = this.bldDlg.open(EditPriorityDialogComponent, {
      data: data,
      width: '400px'
    });

    this.dlgEditPriority.afterClosed().subscribe({
      next: (retVal: DialogReturn<EditPriorityDlgData>) => {
        if (retVal && retVal.result === DialogResult.OK) {
          const dto = retVal.data.dto as PriorityCreateDto;
          dto.backcolor = dto.backcolor.slice(1);
          dto.forecolor = dto.forecolor.slice(1);
          this.srvPriority.add(dto).subscribe({
            next: _ => this.getPriorities(),
            error: (err) => this.showError.showError(err, 'Priority')
          })
        }
      }
    })
  }

  onPriorityEdit(priority: Priority) {
    const data = new EditPriorityDlgData();
    data.dlgTitle = this.translate.instant('Priority.EditTitle');
    data.exists = true;
    data.newIcon = null;
    data.hasNullIcon = false;
    const dto = new PriorityUpdateDto();
    dto.id = priority.id;
    dto.name = priority.name;
    dto.importance = priority.importance;
    dto.backcolor = priority.backcolor;
    dto.forecolor = priority.forecolor;
    data.dto = dto;

    this.dlgEditPriority = this.bldDlg.open(EditPriorityDialogComponent, {
      data: data,
      width: '400px'
    });

    this.dlgEditPriority.afterClosed().subscribe({
      next: (retVal: DialogReturn<EditPriorityDlgData>) => {
        if (retVal && retVal.result === DialogResult.OK) {
          const dto = retVal.data.dto as PriorityUpdateDto;
          dto.backcolor = dto.backcolor.slice(1);
          dto.forecolor = dto.forecolor.slice(1);
          this.srvPriority.update(dto).subscribe({
            next: _ => {
              if (retVal.data.hasNullIcon) {
                this.srvPriority.removeIcon(dto.id).subscribe({
                  next: _ => {
                    this.getPriorities();
                  },
                  error: err => {
                    this.showError.showError(err, "Priority");
                  }
                })
              } else if (retVal.data.newIcon !== null) {
                this.srvPriority.setIcon(dto.id, retVal.data.newIcon).subscribe({
                  next: _ => {
                    this.getPriorities();
                  },
                  error: err => {
                    this.showError.showError(err, "Category");
                  }
                })
              } else {
                this.getPriorities();
              }
            },
            error: (err) => this.showError.showError(err, 'Priority')
          })
        }
      }
    })
  }

  onPriorityDelete(priority: Priority) {
    this.showError.showMessageBox(
      this.translate.instant('Priority.DeleteConfirm', {name: priority.name}),
      this.translate.instant('Priority.DeleteTitle'),
      MessageBoxButtons.YesNo,
      MessageBoxIcon.QUESTION
    ).subscribe({
      next: (retVal: DialogResult) => {
        if (retVal && retVal == DialogResult.YES) {
          this.srvPriority.delete(priority.id).subscribe({
            next: _ => this.getPriorities(),
            error: (err) => this.showError.showError(err, 'Priority')
          })
        }
      },
      error: (err) => this.showError.showError(err, 'Priority')
    })
  }

  onClose() {
    this.dlg.close();
  }
}
