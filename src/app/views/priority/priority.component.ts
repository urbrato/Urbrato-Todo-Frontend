import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Priority} from "../../entities/priority";
import {DeviceInfo} from "../../util/device-info";
import {PriorityService} from "../../dao/priority.service";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [
    NgIf,
    MatIcon
  ],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.css'
})
export class PriorityComponent {
  priority: Priority;
  iconUrl: string;
  showButtons = !DeviceInfo.IsDesktop;

  @Input('priority')
  set setPriority(priority: Priority) {
    this.priority = priority;
    this.iconUrl = this.srvPriority.getIconUrl(priority.id);
  }

  @Output()
  editPriorityEvent = new EventEmitter();

  @Output()
  deletePriorityEvent = new EventEmitter<number>();

  constructor(
    private srvPriority: PriorityService
  ) {
  }

  onMouseEnter() {
    this.showButtons = true;
  }

  onMouseLeave() {
    this.showButtons = !DeviceInfo.IsDesktop;
  }

  editPriority() {
    //
  }

  deletePriority() {
    //
  }
}
