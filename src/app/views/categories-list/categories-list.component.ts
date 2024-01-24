import {Component, Input} from '@angular/core';
import {Category} from "../../entities/category";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf, NgForOf, CommonModule} from "@angular/common";
import {CategoryComponent} from "../category/category.component";

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
}
