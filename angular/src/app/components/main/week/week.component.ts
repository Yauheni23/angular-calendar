import { Component } from '@angular/core';
import { getArrayDaysInWeek } from '../../../utils/date';
import { TimePeriod } from '../shared/timePeriod';
import { Task } from '../../../models/task';
import { considerSize, considerTop } from '../../../utils/size';
import { DateService } from '../../../services/date.service';
import { TasksService } from '../../../services/tasks.service';

@Component({
    selector: 'app-week',
    templateUrl: './week.component.html',
    styleUrls: [ './week.component.less' ],
})
export class WeekComponent extends TimePeriod {
    public size: any[] = new Array(7);
    public top: any;
    public tasksByDays: Task[][];
    public tasksForSeveralDays: Task[][];

    constructor(private _dateService: DateService, private _tasksService: TasksService) {
        super();
        this._dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.getTasksByDays();
            this.considerSize();
        });
        this._tasksService.cast.subscribe(() => {
            this.getTasksByDays();
            this.considerSize();
        });
    }

    public get dateOfWeek(): number[] {
        return getArrayDaysInWeek(this.displayedDate);
    }

    public getCurrentDate(dayOfWeek: number): Date {
        return this.getDate(getArrayDaysInWeek(this.displayedDate)[dayOfWeek]);
    }

    private getTasksByDays(): void {
        this.tasksByDays = [];
        this.tasksForSeveralDays = [];

        this.dateOfWeek.forEach(day => {
            this.tasksByDays.push(this._tasksService.getTaskForDay(this.getDate(day)));
            this.tasksForSeveralDays.push(this._tasksService.getTaskForSeveralDaysOfWeek(this.getDate(day)));
        });
    }

    private considerSize(): void {
        for (let i = 0; i < 7; i++) {
            this.size[i] = considerSize(this.tasksByDays[i]);
        }
        this.top = considerTop(this.tasksForSeveralDays, this.getCurrentDate(0));
    }
}
