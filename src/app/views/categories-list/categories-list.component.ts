import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../entities/category";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, NgForOf, CommonModule} from "@angular/common";
import {CategoryComponent} from "../category/category.component";
import {EditCategoryDlgData} from "../../dialogs/edit-category-dialog/edit-category-dlg-data";
import {CategorySearchDto} from "../../dto/category-search-dto";
import {CategorySearchComponent} from "../category-search/category-search.component";

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    TranslateModule,
    CategoryComponent,
    CommonModule,
    NgIf,
    NgForOf,
    CategorySearchComponent
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  categories: Category[];
  filter: CategorySearchDto;

  @Input("categories")
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('search')
  set setSearch(search: CategorySearchDto) {
    this.filter = search;
  }

  @Output()
  editCategoryEvent = new EventEmitter<EditCategoryDlgData>;

  @Output()
  deleteCategoryEvent = new EventEmitter<number>;

  @Output()
  searchCategoriesEvent = new EventEmitter<CategorySearchDto>;

  editCategory($event: EditCategoryDlgData) {
    this.editCategoryEvent.emit($event);
  }

  deleteCategory($event: number) {
    this.deleteCategoryEvent.emit($event);
  }

  searchCategories($event: CategorySearchDto) {
    this.searchCategoriesEvent.emit($event);
  }
}
