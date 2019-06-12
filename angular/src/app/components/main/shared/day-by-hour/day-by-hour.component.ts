import { Component, OnInit } from '@angular/core';
import { size } from '../../../../constants';

@Component({
  selector: 'app-day-by-hour',
  templateUrl: './day-by-hour.component.html',
  styleUrls: ['./day-by-hour.component.less']
})
export class DayByHourComponent implements OnInit {
  public heightDay = size.heightDay;
  public heightHour = size.heightHour;
  public countBlock = new Array(24)
  constructor() { }

  ngOnInit() {
  }

}
