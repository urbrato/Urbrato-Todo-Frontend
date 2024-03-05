import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedColorsEditDialogComponent } from './named-colors-edit-dialog.component';

describe('NamedColorsEditDialogComponent', () => {
  let component: NamedColorsEditDialogComponent;
  let fixture: ComponentFixture<NamedColorsEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamedColorsEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NamedColorsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
