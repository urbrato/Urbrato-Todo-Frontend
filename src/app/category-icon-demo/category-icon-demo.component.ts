import { Component } from '@angular/core';
import {CategoryService} from "../dao/category.service";
import {Category} from "../entities/category";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-icon-demo',
  templateUrl: './category-icon-demo.component.html',
  styleUrls: ['./category-icon-demo.component.css']
})
export class CategoryIconDemoComponent {
  form: FormGroup;

  cats?: Category[];
  file?: File;

  get txtCatId(): AbstractControl {
    return this.form!.get('catId')!;
  }

  constructor(
    private formBuilder: FormBuilder,
    private srvCategory: CategoryService) {
    this.form = this.formBuilder.group({
      catId: ['', Validators.required]
    });

    this.updateCats();
  }

  public updateCats() {
    this.srvCategory.list().subscribe({
      next: (cats) => {
        this.cats = cats;
      }
    })
  }

  public getCatIconUrl(cat: Category) {
    return this.srvCategory.getIconUrl(cat.id!);
  }

  public setFile(event: any) {
    this.file = event.target.files[0];
  }

  public sendIcon() {
    if (this.file !== undefined) {
      this.srvCategory.setIcon(this.txtCatId.value, this.file!);
    }
  }
}
