import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFromMailComponent } from './confirm-from-mail.component';

describe('ConfirmFromMailComponent', () => {
  let component: ConfirmFromMailComponent;
  let fixture: ComponentFixture<ConfirmFromMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmFromMailComponent]
    });
    fixture = TestBed.createComponent(ConfirmFromMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
