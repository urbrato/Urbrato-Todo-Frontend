import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BothColorsEditComponent } from './both-colors-edit.component';

describe('BothColorsEditComponent', () => {
  let component: BothColorsEditComponent;
  let fixture: ComponentFixture<BothColorsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BothColorsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BothColorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
