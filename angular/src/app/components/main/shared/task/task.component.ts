import { Component, Input, OnInit } from '@angular/core';
import { size, Time } from '../../../../constants';
import { Task } from '../../../../models/task';
import { ViewService } from '../../../../services/view.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: [ './task.component.less' ],
})
export class TaskComponent implements OnInit {
    public readonly heightHour = size.heightHour;
    public readonly MINUTES_IN_HOUR = 60;
    @Input() public task: Task;
    @Input() public left: number;
    @Input() public width: number;
    public top: number;
    public height: number;

    constructor(private _viewService: ViewService) {
    }

    public ngOnInit() {
        this.top = (this.task.startDate.getHours() + this.task.startDate.getMinutes() / this.MINUTES_IN_HOUR) * this.heightHour;
        this.height = ((+this.task.endDate - +this.task.startDate) / (Time.HourInMilliseconds / 2) | 0) * this.heightHour / 2
            || this.heightHour / 2;
    }

    public showViewTask(): void {
        this._viewService.show(this.task);
    }
}
