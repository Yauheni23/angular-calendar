import { Component } from '@angular/core';
import { size } from '../../../../constants';

@Component({
  selector: 'app-day-by-hour',
  templateUrl: './day-by-hour.component.html',
  styleUrls: ['./day-by-hour.component.less']
})
export class DayByHourComponent {
  public heightDay: number = size.heightDay;
  public heightHour: number = size.heightHour;
  public countBlock: void[] = new Array(24);
}
