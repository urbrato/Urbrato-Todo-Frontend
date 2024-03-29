import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriorityDialogComponent } from './edit-priority-dialog.component';

describe('EditPriorityDialogComponent', () => {
  let component: EditPriorityDialogComponent;
  let fixture: ComponentFixture<EditPriorityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPriorityDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPriorityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
