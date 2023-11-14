import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {UserDto} from "../../dto/user-dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form: FormGroup;
  wasSubmitPressed: boolean = false;
  isLoading: boolean = false;
  controllerMessage: string = '';

  get txtLogin(): AbstractControl {
    return this.form!.get('login')!;
  }

  get txtEmail(): AbstractControl {
    return this.form!.get('email')!;
  }

  get txtName(): AbstractControl {
    return this.form!.get('username')!;
  }

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

    const user: UserDto = new UserDto();
    user.login = this.txtLogin.value;
    user.email = this.txtEmail.value;
    user.name = this.txtName.value;
    user.password = this.txtPassword.value;

    this.authService.register(user).subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result.code === 'OK') {
            window.location.href = '';
            this.controllerMessage = '';
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
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {

    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_copy: ['', []]
    });
  }
}
