import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {LoginDto} from "../../dto/login-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  wasSubmitPressed: boolean = false;

  get txtLogin(): AbstractControl {
    return this.form!.get('login')!;
  }

  get txtPassword(): AbstractControl {
    return this.form!.get('password')!;
  }

  submitForm() {
    this.wasSubmitPressed = true;

    if (this.form.invalid) {
      return;
    }

    const login: LoginDto = new LoginDto();
    login.login = this.txtLogin.value;
    login.password = this.txtPassword.value;

    this.authService.login(login).subscribe({
        next: (result) => {
          if (result.code === 'OK') {
            alert(result.payload!.name! + ' logged in');
          } else {
            alert(result.message!);
          }
        },
        error: (err) => {
          if (err.error.message === undefined) {
            alert(err.message);
          } else {
            alert(err.error.message);
          }
        }
      }
    )
  }

  ngOnInit(): void {
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {

    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
