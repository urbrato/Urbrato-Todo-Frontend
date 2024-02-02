import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../entities/category";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, NgForOf, CommonModule} from "@angular/common";
import {CategoryComponent} from "../category/category.component";
import {EditCategoryDlgData} from "../../dialogs/edit-category-dialog/edit-category-dlg-data";

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    TranslateModule,
    CategoryComponent,
    CommonModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  categories: Category[];

  @Input("categories")
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Output()
  editCategoryEvent = new EventEmitter<EditCategoryDlgData>;

  @Output()
  deleteCategoryEvent = new EventEmitter<number>;

  editCategory($event: EditCategoryDlgData) {
    this.editCategoryEvent.emit($event);
  }

  deleteCategory($event: number) {
    this.deleteCategoryEvent.emit($event);
  }
}
