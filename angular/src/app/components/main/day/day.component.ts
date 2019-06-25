import { Component } from '@angular/core';
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

export class DayComponent extends TimePeriod {
    public tasks: Task[] = [];
    public tasksForSeveralDays: Task[];
    public size: any;

    constructor(private _dateService: DateService, private _tasksService: TasksService) {
        super();
        this._dateService.cast.subscribe(data => {
            this.displayedDate = data;
            this.getTasks();
        });
        this._tasksService.cast.subscribe(() => {
            this.getTasks();
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

    private getTasks(): void {
        this.tasks = this._tasksService.getTaskForDay(this.displayedDate);
        this.tasksForSeveralDays = this._tasksService.getTaskForSeveralDays(this.displayedDate);
        this.size = considerSize(this.tasks);
    }
}
