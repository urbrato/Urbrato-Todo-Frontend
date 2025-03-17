import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-select-date-dialog',
  standalone: true,
  imports: [],
  template: `<p>select-date-dialog works!</p>`,
  styleUrl: './select-date-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDateDialogComponent { }
