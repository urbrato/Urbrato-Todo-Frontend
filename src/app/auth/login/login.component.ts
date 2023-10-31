import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, Validators} from "@angular/forms";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  get txtLogin(): AbstractControl {
    return this.form!.get('login')!;
  }

  get txtPassword(): AbstractControl {
    return this.form!.get('password')!;
  }

  submitForm() {
    alert(this.txtLogin.value + '|' + this.txtPassword.value);
  }

  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
