import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../entities/category";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, NgForOf, CommonModule} from "@angular/common";
import {CategoryComponent} from "../category/category.component";
import {EditCategoryDlgData} from "../../dialogs/edit-category-dialog/edit-category-dlg-data";
import {CategorySearchDto} from "../../dto/category-search-dto";
import {CategorySearchComponent} from "../category-search/category-search.component";
import {Stat} from "../../entities/stat";

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
  selectedCategory: Category;

  @Input()
  stat: Stat;

  @Input("categories")
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('search')
  set setSearch(search: CategorySearchDto) {
    this.filter = search;
  }

  @Input('selectedCategory')
  set setSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }

  @Output()
  editCategoryEvent = new EventEmitter<EditCategoryDlgData>;

  @Output()
  deleteCategoryEvent = new EventEmitter<number>;

  @Output()
  searchCategoriesEvent = new EventEmitter<CategorySearchDto>;

  @Output()
  selectCategoryEvent = new EventEmitter<Category>;

  editCategory($event: EditCategoryDlgData) {
    this.editCategoryEvent.emit($event);
  }

  deleteCategory($event: number) {
    this.deleteCategoryEvent.emit($event);
  }

  searchCategories($event: CategorySearchDto) {
    this.searchCategoriesEvent.emit($event);
  }

  selectCategory(category: Category) {
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      this.selectCategoryEvent.emit(category);
    }
  }
}
