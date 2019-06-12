import { Component, Input, OnInit } from '@angular/core';
import { size } from '../../../../constants';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  public nameTask = 'Name';
  public startDate = new Date();
  public endDate = new Date();
  public heightHour = size.heightHour;
  constructor() { }

  ngOnInit() {
  }

}
