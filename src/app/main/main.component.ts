import {Component, OnInit} from '@angular/core';
import {User} from "../entities/user";
import {AuthService} from "../service/auth.service";
import {ProfileService} from "../service/profile.service";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";
import {MatDrawerMode} from "@angular/material/sidenav";
import {TranslateService} from "@ngx-translate/core";
import {Category} from "../entities/category";
import {CategoryService} from "../dao/category.service";

export const LANG_RU = 'ru';
export const LANG_EO = 'eo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentUser: User | null = null;
  categories: Category[] = [];

  // тип устройства
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;

  // настройки боковой панели
  catsOpened: boolean = false; // открыто ли изначально
  catsMode: MatDrawerMode = "side"; // режим открытия

  constructor(
    private srvAuth: AuthService,
    private srvProfile: ProfileService,
    private srvCategory: CategoryService,
    private router: Router,
    private deviceDetector: DeviceDetectorService,
    private translate: TranslateService) {

    srvAuth.currentUser.subscribe(user => {
      this.currentUser = user;
      srvCategory.list().subscribe({
        next: (categories) =>
          this.categories = categories
      })
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

    translate.addLangs([LANG_RU, LANG_EO]);
    translate.setDefaultLang(LANG_RU);
  }

  ngOnInit(): void {
    this.detectDevice();
    this.initCatsDrawer();
    this.translate.use(LANG_RU);
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
