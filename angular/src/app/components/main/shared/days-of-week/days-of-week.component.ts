import { Component } from '@angular/core';
import { calendar } from '../../../../constants';

@Component({
  selector: 'app-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.less']
})
export class DaysOfWeekComponent {
  public readonly daysOfWeek: string[] = calendar.DAYS_OF_WEEK;
}
