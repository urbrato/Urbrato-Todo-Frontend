import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {User} from "../entities/user";
import {ProfileService} from "../service/profile.service";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  currentUser?: User;

  constructor(private authService: AuthService,
              private profileService: ProfileService) {
    if (authService.currentUser == undefined) {
      profileService.getCurrentUser().subscribe({
        next: (user) => {
          authService.currentUser = user;
          this.currentUser = user;
        },
        error: (err) => {
          if (err.error.message === undefined) {
            alert(err.message);
          } else {
            alert(err.error.message);
          }
        }
      });
    } else {
      this.currentUser = authService.currentUser;
    }
  }
}
