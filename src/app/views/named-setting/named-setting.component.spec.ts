import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedSettingComponent } from './named-setting.component';

describe('NamedSettingComponent', () => {
  let component: NamedSettingComponent;
  let fixture: ComponentFixture<NamedSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamedSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NamedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
