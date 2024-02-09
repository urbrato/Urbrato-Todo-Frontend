import {Component, Input} from '@angular/core';
import {StatCardComponent} from "../stat-card/stat-card.component";
import {TranslateModule} from "@ngx-translate/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-stat',
  standalone: true,
  imports: [
    StatCardComponent,
    TranslateModule
  ],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css',
  animations: [
    trigger('statArea', [
      state(
        'show', style({
          // overflow: 'hidden',
          height: '*',
          opacity: '1'
        })
      ),
      state(
        'hide', style({
          // overflow: 'hidden',
          height: '0',
          opacity: '0'
        })
      ),
      transition('* => *', animate('300ms ease-in-out'))
    ])
  ]
})
export class StatComponent {
  @Input()
  completed: number;

  @Input()
  uncompleted: number;

  showStat: boolean = false;
  animationState: string = 'hide';

  onToggleStat() {
    this.showStat = !this.showStat;
    if (this.showStat) {
      this.animationState = 'show';
    } else {
      this.animationState = 'hide';
    }
  }
}
