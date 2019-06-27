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
    public readonly heightHour: number = size.heightHour;
    public readonly MINUTES_IN_HOUR: number = 60;
    @Input() public task: Task;
    @Input() public left: number;
    @Input() public width: number;
    public top: number;
    public height: number;

    constructor(private viewService: ViewService) {
    }

    public ngOnInit(): void {
        this.top = (this.task.startDate.getHours() + this.task.startDate.getMinutes() / this.MINUTES_IN_HOUR) * this.heightHour;
        this.height = ((+this.task.endDate - +this.task.startDate) / (Time.HourInMilliseconds / 2) | 0) * this.heightHour / 2
            || this.heightHour / 2;
    }

    public showViewTask(event: MouseEvent): void {
        this.viewService.show(this.task);
        event.stopPropagation();
    }
}
