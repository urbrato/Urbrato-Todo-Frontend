import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCaptchaComponent } from './register-captcha.component';

describe('RegisterCaptchaComponent', () => {
  let component: RegisterCaptchaComponent;
  let fixture: ComponentFixture<RegisterCaptchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCaptchaComponent]
    });
    fixture = TestBed.createComponent(RegisterCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
