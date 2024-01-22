import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../entities/user";
import {ProfileService} from "../../service/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private router: Router) {
    if (authService.currentUser.value === null) {
      profileService.getCurrentUser().subscribe({
        next: (user) => {
          authService.currentUser.next(user);
        },
        error: (_) => {
          this.authService.currentUser.next(null);
        }
      });
    }

    this.authService.currentUser.subscribe((user) => this.currentUser = user);
  }

  btnLogout_Click() {
    this.authService.logout().subscribe({
      next: (_) => {
        this.authService.currentUser.next(null);
        this.router.navigate(['']).then(_ => {});
      },
      error: (_) => {
        this.authService.currentUser.next(null);
        this.router.navigate(['']).then(_ => {});
      }
    });
  }
}
