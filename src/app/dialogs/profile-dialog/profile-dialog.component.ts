import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogTitle,
        TranslateModule,
        MatButton,
        MatLabel,
        MatInput,
        MatSlideToggle,
        MatFormField
    ],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css'
})
export class ProfileDialogComponent {

}
