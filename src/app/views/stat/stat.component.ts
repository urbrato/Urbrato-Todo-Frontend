import {Component, Input} from '@angular/core';
import {StatCardComponent} from "../stat-card/stat-card.component";
import {TranslateModule} from "@ngx-translate/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../service/auth.service";
import {LocalStorageUtils} from "../../util/local-storage-utils";

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
          height: '*',
          opacity: '1'
        })
      ),
      state(
        'hide', style({
          height: '0',
          opacity: '0'
        })
      ),
      transition('* => *', animate('300ms ease-in-out'))
    ])
  ]
})
export class StatComponent {
  readonly SHOW_STATS = 'showStats';

  @Input()
  completed: number;

  @Input()
  uncompleted: number;

  showStat: boolean = false;
  animationState: string = 'hide';

  constructor(
    private srvAuth: AuthService
  ) {
    this.srvAuth.currentUser.subscribe((user) => {
      if (user !== null) {
        const lsShowStat = LocalStorageUtils.getObject<boolean>(
          this.SHOW_STATS,
          user
        );

        if (lsShowStat !== null) {
          this.showStat = lsShowStat;
          this.setAnimationState();
        }
      }
    })
  }

  setAnimationState() {
    if (this.showStat) {
      this.animationState = 'show';
    } else {
      this.animationState = 'hide';
    }

    if (this.srvAuth.currentUser.value !== null) {
      LocalStorageUtils.setObject(
        this.SHOW_STATS,
        this.srvAuth.currentUser.value,
        this.showStat
      )
    }
  }

  onToggleStat() {
    this.showStat = !this.showStat;
    this.setAnimationState();
  }
}
