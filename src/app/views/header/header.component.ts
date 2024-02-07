import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../entities/category";
import {User} from "../../entities/user";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ROLE_ADMIN} from "../../entities/role";

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
}
