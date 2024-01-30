import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewCategoryDialogComponent} from "../../dialogs/new-category-dialog/new-category-dialog.component";
import {CategoryCreateDto} from "../../dto/category-create-dto";
import {DialogReturn} from "../../util/dialog-return";
import {DialogResult} from "../../util/dialog-result";

@Component({
  selector: 'app-categories-logo',
  standalone: true,
  imports: [
    TranslateModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './categories-logo.component.html',
  styleUrl: './categories-logo.component.css'
})
export class CategoriesLogoComponent {
  @Output()
  addCategoryEvent = new EventEmitter<CategoryCreateDto>();

  constructor(
    private dlgAdd: MatDialogRef<NewCategoryDialogComponent>,
    private bldDlg: MatDialog
  ) {
  }

  addCategory() {
    let data = new CategoryCreateDto();
    data.name = '';

    this.dlgAdd = this.bldDlg.open(NewCategoryDialogComponent, {
      data: data,
      width: '400px'
    });

    this.dlgAdd.afterClosed().subscribe({
      next: (retVal: DialogReturn<CategoryCreateDto>) => {
        if (retVal && retVal.result === DialogResult.OK) {
          this.addCategoryEvent.emit(retVal.data);
        }
      }
    })
  }
}
