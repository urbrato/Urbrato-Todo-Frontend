import {Component, Input} from '@angular/core';
import {Category} from "../../entities/category";
import {CategoryService} from "../../dao/category.service";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

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

  @Input('category')
  set setCategory(category: Category) {
    this.category = category;
    this.iconUrl = this.srvCategory.getIconUrl(category.id);
    this.srvCategory.hasIcon(category.id).subscribe({
      next: (has) => this.hasIcon = has,
      error: (_) => this.hasIcon = false
    });
  }

  constructor(private srvCategory: CategoryService) {
  }

  msg(msg: string) {
    alert(msg);
  }
}
