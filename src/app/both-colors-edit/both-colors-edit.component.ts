import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColorPickerModule} from "ngx-color-picker";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-both-colors-edit',
  standalone: true,
  imports: [
    ColorPickerModule,
    FormsModule
  ],
  templateUrl: './both-colors-edit.component.html',
  styleUrl: './both-colors-edit.component.css'
})
export class BothColorsEditComponent {
  @Input()
  backColor: string;

  @Output()
  backColorChange = new EventEmitter<string>();

  @Input()
  foreColor: string;

  @Output()
  foreColorChange = new EventEmitter<string>();

  onBackColorChange() {
    this.backColorChange.emit(this.backColor);
  }

  onForeColorChange() {
    this.foreColorChange.emit(this.foreColor);
  }
}
