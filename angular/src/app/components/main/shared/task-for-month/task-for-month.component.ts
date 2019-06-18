import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-for-month',
  templateUrl: './task-for-month.component.html',
  styleUrls: ['./task-for-month.component.less']
})
export class TaskForMonthComponent implements OnInit {
  @Input() task: Task;
  public isVisibleViewTask: boolean;

  constructor() { }

  ngOnInit() {
  }

  public actionsDialog( action: any ): void {
    if ( action.type === 'close' ) {
      this.hideViewTask();
    }
  }

  public showViewTask(): void {
    this.isVisibleViewTask = true;
  }

  public hideViewTask = (): void => {
    this.isVisibleViewTask = false;
  }

}
