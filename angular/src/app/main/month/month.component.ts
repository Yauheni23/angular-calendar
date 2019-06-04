import { Component, OnInit } from '@angular/core';
import { getDaysInMonth } from '../../../utils/date';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.less']
})
export class MonthComponent implements OnInit {
  private displayedDate = new Date();
  public dateInMonth = getDaysInMonth(this.displayedDate);
  constructor() { }

  ngOnInit() {
  }

  getDate(day: number) {
    return new Date(this.displayedDate.getFullYear(), this.displayedDate.getMonth(), +day).getDate();
  }

}
