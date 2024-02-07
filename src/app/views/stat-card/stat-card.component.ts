import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgIf, PercentPipe} from "@angular/common";

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    PercentPipe
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input()
  count: number;

  @Input()
  total: number;

  @Input()
  title: string;

  @Input()
  icon: string;
}
