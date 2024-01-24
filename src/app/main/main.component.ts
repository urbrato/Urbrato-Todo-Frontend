import {Component, OnInit} from '@angular/core';
import {User} from "../entities/user";
import {AuthService} from "../service/auth.service";
import {ProfileService} from "../service/profile.service";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";
import {MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUser: User | null = null;

  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;

  catsOpened: boolean = false;
  catsMode: MatDrawerMode = "side";

  constructor(
    private srvAuth: AuthService,
    private srvProfile: ProfileService,
    private router: Router,
    private deviceDetector: DeviceDetectorService) {

    srvAuth.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.currentUser = this.srvAuth.currentUser.value;
    if (this.currentUser == null) {
      this.srvProfile.getCurrentUser().subscribe({
        next: (user) => {
          this.srvAuth.currentUser.next(user);
        },
        error: (_) => {
          this.srvAuth.currentUser.next(null);
          this.router.navigate(['']).then(_ => {});
        }
      });
    }
  }

  ngOnInit(): void {
    this.detectDevice();
    this.initCatsDrawer();
  }

  detectDevice() {
    this.isMobile = this.deviceDetector.isMobile();
    this.isTablet = this.deviceDetector.isTablet();
    this.isDesktop = this.deviceDetector.isDesktop();
  }

  initCatsDrawer() {
    if (this.isMobile) {
      this.catsOpened = false;
      this.catsMode = "over";
    } else {
      this.catsOpened = true;
      this.catsMode = "push";
    }
  }
}
