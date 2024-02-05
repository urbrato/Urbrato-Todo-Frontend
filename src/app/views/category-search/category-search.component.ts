import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {CategorySearchDto} from "../../dto/category-search-dto";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-search',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    TranslateModule,
    MatIcon,
    MatSuffix,
    MatIconButton,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './category-search.component.html',
  styleUrl: './category-search.component.css'
})
export class CategorySearchComponent {
  dto: CategorySearchDto;
  name: string;
  changed: boolean;

  @Input('search')
  set setCategorySearch(categorySearch: CategorySearchDto) {
    this.dto = categorySearch;
    if (categorySearch && categorySearch !== null) {
      this.name = categorySearch.name;
    }
    this.changed = false;
  }

  @Output()
  searchEvent = new EventEmitter<CategorySearchDto>();

  search() {
    this.changed = false;
    this.dto.name = this.name;
    this.searchEvent.emit(this.dto);
  }

  clearAndSearch() {
    this.name = '';
    this.search();
  }

  searchIfEmpty() {
    if (this.name.trim().length === 0) {
      this.search();
    }
  }

  checkChanged() {
    this.changed = this.name !== this.dto.name;
  }
}
