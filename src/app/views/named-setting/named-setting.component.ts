import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DeviceInfo} from "../../util/device-info";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-named-setting',
  standalone: true,
  imports: [
    MatIcon,
    NgIf
  ],
  templateUrl: './named-setting.component.html',
  styleUrl: './named-setting.component.css'
})
export class NamedSettingComponent {
  showButtons = !DeviceInfo.IsDesktop;

  @Input()
  name: string;

  @Output()
  editEvent = new EventEmitter();

  onMouseEnter() {
    this.showButtons = true;
  }

  onMouseLeave() {
    this.showButtons = !DeviceInfo.IsDesktop;
  }

  edit() {
    this.editEvent.emit()
  }
}
