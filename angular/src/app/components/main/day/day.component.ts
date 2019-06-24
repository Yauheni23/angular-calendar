import { Component, OnInit } from '@angular/core';
import { calendar } from '../../../constants';
import { convertInFormatInput } from '../../../utils/date';
import { TimePeriod } from '../shared/timePeriod';
import { Task } from '../../../models/task';
import { considerSize } from '../../../utils/size';
import { DateService } from '../../../services/date.service';
import { TasksService } from '../../../services/tasks.service';
import { Class } from '../constants';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: [ './day.component.less' ],
})

export class DayComponent extends TimePeriod implements OnInit {
    public today: number | undefined;
    public tasks: Task[] = [];
    public tasksForSeveralDays: Task[];
    public size: any;

    constructor(private _dateService: DateService, private _tasksService: TasksService) {
        super();
    }

    public ngOnInit() {
        this._dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.tasks = this._tasksService.tasks;
            this.sortTask();
        });
        this._tasksService.cast.subscribe(data => {
            this.tasks = data;
            this.sortTask();
        });
    }

    public get dayOfWeek(): string {
        return calendar.DAYS_OF_WEEK[this.displayedDate.getDay()];
    }

    public get day(): number {
        return this.displayedDate.getDate();
    }

    public isToday(): string {
        return convertInFormatInput(this.getDate(this.day)) === this.todayString ? Class.Today : '';
    }

    private sortTask(): void {
        this.selectTaskForSeveralDays();
        this.selectTaskForDay();
        this.size = considerSize(this.tasks);
    }

    private selectTaskForSeveralDays(): void {
        this.tasksForSeveralDays = this.tasks.filter(task => {
            return task.startDate.toDateString() !== task.endDate.toDateString()
                && +task.startDate <= new Date(this.displayedDate).setHours(24)
                && +task.endDate >= new Date(this.displayedDate).setHours(0, 0, 0, 0);
        });
    }

    private selectTaskForDay(): void {
        this.tasks = this.tasks.filter(task => {
            return this.displayedDate.toDateString() === task.startDate.toDateString()
                && this.displayedDate.toDateString() === task.endDate.toDateString();
        }).sort((current, next) => {
            return (next.endDate.getHours() - next.startDate.getHours()) - (current.endDate.getHours() - current.startDate.getHours());
        });
    }

}
