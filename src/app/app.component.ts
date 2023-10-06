import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  cookieEnabled: boolean = false;

  ngOnInit(): void {
    this.cookieEnabled = navigator.cookieEnabled;

    // на случай, если navigator не поддерживается
    if (!this.cookieEnabled) {
      document.cookie = 'test_cookie';
      this.cookieEnabled = document.cookie.indexOf('test_cookie') !== -1;
    }
  }
}
