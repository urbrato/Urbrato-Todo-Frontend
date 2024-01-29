import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesLogoComponent } from './categories-logo.component';

describe('CategoriesLogoComponent', () => {
  let component: CategoriesLogoComponent;
  let fixture: ComponentFixture<CategoriesLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
