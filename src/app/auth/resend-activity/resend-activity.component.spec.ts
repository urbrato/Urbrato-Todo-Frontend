import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendActivityComponent } from './resend-activity.component';

describe('ResendActivityComponent', () => {
  let component: ResendActivityComponent;
  let fixture: ComponentFixture<ResendActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResendActivityComponent]
    });
    fixture = TestBed.createComponent(ResendActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
