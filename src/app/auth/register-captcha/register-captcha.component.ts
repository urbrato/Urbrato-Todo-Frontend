import { Component } from '@angular/core';

@Component({
  selector: 'app-register-captcha',
  templateUrl: './register-captcha.component.html',
  styleUrls: ['./register-captcha.component.css']
})
export class RegisterCaptchaComponent {
  resolved() {
    window.location.href = 'auth/register';
  }

  errored() {
    alert(`Ошибка при выполнении теста Тьюринга`);
  }
}
