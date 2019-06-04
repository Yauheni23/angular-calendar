import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../constants';
import { getArrayDaysInWeek, getTimeZone } from '../../../utils/date';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.less']
})
export class WeekComponent implements OnInit {
  private displayedDate = new Date(); //получить с сервиса
  public timeZone = getTimeZone();
  private heightDay = size.heightDay;
  public daysOfWeek = calendar.DAYS_OF_WEEK;
  public dateOfWeek = getArrayDaysInWeek(this.displayedDate);
  constructor() { }

  ngOnInit() {
  }

  getDate(day: number): number {
    return new Date(this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day).getDate();
  }
}
