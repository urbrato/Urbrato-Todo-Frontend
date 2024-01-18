import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CategoryService} from "../../dao/category.service";
import {Category} from "../../entities/category";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUtils} from "../../util/file-utils";

@Component({
  selector: 'app-category-icon-demo',
  templateUrl: './category-icon-demo.component.html',
  styleUrls: ['./category-icon-demo.component.css']
})
export class CategoryIconDemoComponent implements OnInit {
  form: FormGroup;

  cats?: Category[];
  file?: File;

  get txtCatId(): AbstractControl {
    return this.form!.get('catId')!;
  }

  constructor(
    private formBuilder: FormBuilder,
    private srvCategory: CategoryService,
    private cdr: ChangeDetectorRef) {
    this.form = this.formBuilder.group({
      catId: ['', Validators.required]
    });

    this.updateCats();
  }

  ngOnInit() {
    this.cdr.detectChanges();
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
      this.srvCategory.setIcon(parseInt(this.txtCatId.value as string), this.file!).subscribe({
        next: (result) => {
          this.cdr.detectChanges();
        },
        error: (err) => {
          if (err.error.message === undefined) {
            alert(err.message);
          } else {
            alert(err.error.message);
          }
        }
      })
    }
  }
}
