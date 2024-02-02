import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../entities/category";
import {CategoryService} from "../../dao/category.service";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {DeviceInfo} from "../../util/device-info";
import {CategoryUpdateDto} from "../../dto/category-update-dto";
import {EditCategoryDlgData} from "../../dialogs/edit-category-dialog/edit-category-dlg-data";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialogs/edit-category-dialog/edit-category-dialog.component";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";
import {MessageBoxComponent} from "../../dialogs/message-box/message-box.component";
import {MessageBoxData} from "../../util/message-box-data";
import {TranslateService} from "@ngx-translate/core";
import {MessageBoxButtons} from "../../util/message-box-buttons";
import {MessageBoxIcon} from "../../util/message-box-icon";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatIcon,
    NgIf
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  category: Category;
  iconUrl: string;
  hasIcon: boolean;
  showButtons: boolean = !DeviceInfo.IsDesktop;

  @Input('category')
  set setCategory(category: Category) {
    this.category = category;
    this.iconUrl = this.srvCategory.getIconUrl(category.id);
    this.srvCategory.hasIcon(category.id).subscribe({
      next: (has) => this.hasIcon = has,
      error: (_) => this.hasIcon = false
    });
  }

  @Output()
  editCategoryEvent = new EventEmitter<EditCategoryDlgData>();

  @Output()
  deleteCategoryEvent = new EventEmitter<number>();

  constructor(
    private srvCategory: CategoryService,
    private translate: TranslateService,
    private dlgEdit: MatDialogRef<EditCategoryDialogComponent>,
    private dlgMsgBox: MatDialogRef<MessageBoxComponent>,
    private bldDlg: MatDialog
  ) {
  }

  onMouseEnter() {
    this.showButtons = true;
  }

  onMouseLeave() {
    this.showButtons = !DeviceInfo.IsDesktop;
  }

  editCategory() {
    let dto = new CategoryUpdateDto();
    dto.id = this.category.id;
    dto.name = this.category.name;

    let data = new EditCategoryDlgData(
      dto,
      false,
      null
    );

    this.dlgEdit = this.bldDlg.open(EditCategoryDialogComponent, {
      data: data,
      width: '400px'
    });

    this.dlgEdit.afterClosed().subscribe({
      next: (retVal: DialogReturn<EditCategoryDlgData>) => {
        if (retVal && retVal.result === DialogResult.OK) {
          this.editCategoryEvent.emit(retVal.data);
        }
      }
    })
  }

  deleteCategory() {
    const msgData = new MessageBoxData(
      this.translate.instant('Category.DeleteConfirm', {name: this.category.name}),
      this.translate.instant('Category.DeleteTitle'),
      MessageBoxButtons.YesNo,
      MessageBoxIcon.QUESTION
    )

    this.dlgMsgBox = this.bldDlg.open(MessageBoxComponent, {
      data: msgData,
      width: '400px'
    });

    this.dlgMsgBox.afterClosed().subscribe({
      next: (retVal: DialogResult) => {
        if (retVal && retVal == DialogResult.YES) {
          this.deleteCategoryEvent.emit(this.category.id);
        }
      }
    })
  }
}
