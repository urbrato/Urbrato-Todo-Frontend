import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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

}
