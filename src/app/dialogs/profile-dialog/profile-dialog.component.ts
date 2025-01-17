import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        TranslateModule,
        MatButton,
        MatSlideToggle,
        MatFormField
    ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css'
})
export class ProfileDialogComponent {

}
