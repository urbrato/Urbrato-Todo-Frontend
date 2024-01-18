import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIconDemoComponent } from './category-icon-demo.component';

describe('CategoryIconDemoComponent', () => {
  let component: CategoryIconDemoComponent;
  let fixture: ComponentFixture<CategoryIconDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryIconDemoComponent]
    });
    fixture = TestBed.createComponent(CategoryIconDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
