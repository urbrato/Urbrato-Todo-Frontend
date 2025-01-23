import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Router } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Category } from "../../entities/category";
import { ROLE_ADMIN } from "../../entities/role";
import { User } from "../../entities/user";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    TranslateModule,
    NgIf,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input()
  category: Category;

  @Input()
  user: User;

  @Output()
  toggleDrawerEvent = new EventEmitter();

  @Output()
  editSettingsEvent = new EventEmitter();

  @Output()
  editProfileEvent = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private srvAuth: AuthService,
    private router: Router
  ) {
  }

  getCategoryName(): string {
    if (this.category === null)
      return this.translate.instant('Category.All');
    else
      return this.category.name;
  }

  isAdmin(): boolean {
    if (this.user === null)
      return false;
    else
      return this.user.roles.some(role => role.id === ROLE_ADMIN);
  }

  toggleDrawer() {
    this.toggleDrawerEvent.emit();
  }

  logout() {
    this.srvAuth.logout().subscribe({
      next: _ => {
        this.srvAuth.currentUser.next(null);
        this.router.navigate(['']).then(_ => {});
      }
    });
  }

  settings() {
    this.editSettingsEvent.emit();
  }

  profile() {
    this.editProfileEvent.emit();
  }
}
