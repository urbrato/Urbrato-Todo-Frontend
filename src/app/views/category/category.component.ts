import {Component, Input} from '@angular/core';
import {Category} from "../../entities/category";
import {CategoryService} from "../../dao/category.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  category: Category;
  iconUrl: string;

  @Input('category')
  set setCategory(category: Category) {
    this.category = category;
    this.iconUrl = this.srvCategory.getIconUrl(category.id);
  }

  constructor(private srvCategory: CategoryService) {
  }

  msg(msg: string) {
    alert(msg);
  }
}
