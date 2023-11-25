import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityService} from "../service/activity.service";

@Component({
  selector: 'app-confirm-from-mail',
  templateUrl: './confirm-from-mail.component.html',
  styleUrls: ['./confirm-from-mail.component.css']
})
export class ConfirmFromMailComponent implements OnInit{
  constructor(private activityService: ActivityService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const uuid = params['uuid'];

      this.activityService.confirm(uuid).subscribe({
        next: (result) => {
          if (result === 0) {
            this.router.navigate(['auth/info-page',
              {message: 'Подтверждение действия не удалось. Возможно, ссылка ошибочна или устарела.'}])
              .then(_ => {});
          } else {
            this.router.navigate(['main']).then(_ => {});
          }
        }
      })
    });
  }
}
