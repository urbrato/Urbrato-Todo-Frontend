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

  get usernameField(): AbstractControl {
    return this.form!.get('username')!;
  }

  get passwordField(): AbstractControl {
    return this.form!.get('password')!;
  }

  submitForm() {
    alert(this.form + '|' + this.usernameField.value + '|' + this.passwordField.value);
  }

  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
