import { Component } from '@angular/core';
import { getArrayDaysInWeek, isTaskForSeveralDays } from '../../../utils/date';
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
    public tasks: Task[] = [];
    public size: any[] = new Array(7);
    public top: any;
    public tasksByDays: Task[][] = [];
    public tasksForSeveralDays: Task[][];

    constructor(private _dateService: DateService, private _tasksService: TasksService) {
        super();
        this._dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.sortTask();
        });
        this._tasksService.cast.subscribe(data => {
            this.tasks = data;
            this.sortTask();
        });
    }

    public get dateOfWeek(): number[] {
        return getArrayDaysInWeek(this.displayedDate);
    }

    public getCurrentDate(dayOfWeek: number): Date {
        return this.getDate(getArrayDaysInWeek(this.displayedDate)[dayOfWeek]);
    }

    private getTasksByDays(): Task[][] {
        const tasksByDays = [];

        this.dateOfWeek.forEach(day => {
            tasksByDays.push(this.tasks.filter(task => {
                return task.startDate.toDateString() === this.getDate(day).toDateString()
                    && task.startDate.toDateString() === task.endDate.toDateString();
            }));
        });

        return tasksByDays;
    }

    private getTasksForSeveralDays(): Task[][] {
        const tasksForSeveralDays = [];

        this.dateOfWeek.forEach(day => {
            tasksForSeveralDays.push(this.tasks.filter(task =>
                isTaskForSeveralDays(task, this.getDate(day)),
            ));
        });

        return tasksForSeveralDays;
    }

    private sortTask(): void {
        this.tasks.sort((a, b) => {
            return (b.endDate.getHours() - b.startDate.getHours()) - (a.endDate.getHours() - a.startDate.getHours());
        });
        this.tasksByDays = this.getTasksByDays();
        this.tasksForSeveralDays = this.getTasksForSeveralDays();
        for (let i = 0; i < 7; i++) {
            this.size[i] = considerSize(this.tasksByDays[i]);
        }
        this.top = considerTop(this.tasksForSeveralDays, this.getCurrentDate(0));
    }
}
