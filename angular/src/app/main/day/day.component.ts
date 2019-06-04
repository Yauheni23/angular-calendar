import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../constants';
import { getTimeZone } from '../../../utils/date';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.less']
})
export class DayComponent implements OnInit {
  private displayedDate = new Date(); //получить с сервиса
  public timeZone = getTimeZone();
  private heightDay = size.heightDay;
  public dayOfWeek = calendar.DAYS_OF_WEEK[this.displayedDate.getDay()];
  public dateOfWeek = this.displayedDate.getDate();
  constructor() { }

  ngOnInit() {
  }

}
