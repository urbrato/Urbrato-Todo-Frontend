import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {PasswordResetDto} from "../../dto/password-reset-dto";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  wasSubmitPressed: boolean = false;
  isLoading: boolean = false;
  controllerMessage: string = '';
  captcha: string = '';

  get txtLogin(): AbstractControl {
    return this.form!.get('login')!;
  }

  resolved(captcha: string) {
    this.captcha = captcha;
  }

  errored() {
    this.captcha = '?';
    this.controllerMessage = 'Ошибка при выполнении теста reCAPTCHA';
  }

  submitForm() {
    this.wasSubmitPressed = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const dto: PasswordResetDto = new PasswordResetDto();
    dto.login = this.txtLogin.value;
    dto.captcha = this.captcha;

    this.authService.resetPassword(dto).subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result.code === 'OK') {
            this.controllerMessage = '';
            this.router.navigate(['auth/info-page',
              {message: 'Вам отправлено письмо для подтверждения сброса пароля. Проверьте почту через 1-2 мин.'}])
              .then(_ => {});
          } else {
            this.controllerMessage = result.message!;
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.error.message === undefined) {
            this.controllerMessage = err.message;
          } else {
            this.controllerMessage = err.error.message;
          }
        }
      }
    )
  }

  ngOnInit() {
    this.captcha = environment.useCaptcha ? '' : '?';
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = this.formBuilder.group({
      login: ['', Validators.required],
    });
  }
}
