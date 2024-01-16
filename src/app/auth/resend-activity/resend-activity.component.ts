import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ReactivateDto} from "../../dto/reactivate-dto";

@Component({
  selector: 'app-resend-activity',
  templateUrl: './resend-activity.component.html',
  styleUrls: ['./resend-activity.component.css']
})
export class ResendActivityComponent implements OnInit {
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

    const dto: ReactivateDto = new ReactivateDto();
    dto.login = this.txtLogin.value;
    dto.captcha = this.captcha;

    this.authService.reactivate(dto).subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result.code === 'OK') {
            this.controllerMessage = '';
            this.router.navigate(['auth/info-page',
              {message: 'Письмо со ссылкой направлено повторно. Проверьте почту через 1-2 мин.'}])
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
