import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {addDays, startOfDay, isEqual} from 'date-fns';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dueDatePipe',
  standalone: true
})
export class DueDatePipePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  transform(date: Date | string, format: string = 'dd.MM.yyyy'): unknown {
    if (!date) {
      return this.translate.instant('Task.WithoutDueDate')
    }

    const srcDate = new Date(date);
    const srcDateDay = startOfDay(srcDate);
    const today = startOfDay(new Date());

    if (isEqual(srcDateDay, today)) {
      return this.translate.instant('Task.SetDueDate.Today');
    } else if (isEqual(srcDateDay, new Date(addDays(today, 1)))) {
      return this.translate.instant('Task.SetDueDate.Tomorrow');
    } else if (isEqual(srcDateDay, new Date(addDays(today, -1)))) {
      return this.translate.instant('Task.SetDueDate.Yesterday')
    } else if (isEqual(srcDateDay, new Date(addDays(today, 2)))) {
      return this.translate.instant('Task.SetDueDate.AfterTomorrow');
    } else if (isEqual(srcDateDay, new Date(addDays(today, -2)))) {
      return this.translate.instant('Task.SetDueDate.BeforeYesterday')
    } else {
      return new DatePipe(this.translate.currentLang).transform(date, format);
    }
  }
}
