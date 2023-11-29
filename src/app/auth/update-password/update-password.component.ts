import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../service/profile.service";
import {ActivityService} from "../../service/activity.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup;
  wasSubmitPressed: boolean = false;
  isLoading: boolean = false;
  controllerMessage: string = '';
  isCheckingUuid: boolean = true;

  get txtPassword(): AbstractControl {
    return this.form!.get('password')!;
  }

  get txtPasswordCopy(): AbstractControl {
    return this.form!.get('password_copy')!;
  }

  submitForm() {
    this.wasSubmitPressed = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.profileService.updatePassword(this.txtPassword.value).subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result === true) {
            this.controllerMessage = '';
            this.router.navigate(['main']).then(_ => {});
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
    this.isCheckingUuid = true;

    this.route.params.subscribe(params => {
      const uuid = params['uuid'];

      this.activityService.confirm(uuid).subscribe({
        next: (result) => {
          if (result === 0) {
            this.router.navigate(['auth/info-page',
              {message: 'Подтверждение действия не удалось. Возможно, ссылка ошибочна или устарела.'}])
              .then(_ => {});
          } else {
            this.isCheckingUuid = false;
          }
        },
        error: (_) => {
          this.router.navigate(['auth/info-page',
            {message: 'Возникла непредвиденная ошибка. Возможно, сервер не отвечает.'}])
            .then(_ => {});
        }
      })
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router) {

    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      password_copy: ['', []]
    });
  }
}
