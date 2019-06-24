import { Component } from '@angular/core';
import { getDaysInMonth } from '../../../utils/date';
import { TimePeriod } from '../shared/timePeriod';
import { DateService } from '../../../services/date.service';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task';
import { EditorService } from '../../../services/editor.service';

@Component({
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: [ './month.component.less' ],
})
export class MonthComponent extends TimePeriod {
    public dateInMonth: number[][];
    public tasks: Task[];

    constructor(private _dateService: DateService, private _tasksService: TasksService, private _editorService: EditorService) {
        super();
        this._dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.dateInMonth = getDaysInMonth(this.displayedDate);
        });
        this._tasksService.cast.subscribe(data => {
            this.tasks = data.sort((currentValue, nextValue) => {
                return currentValue.startDate.getHours() - nextValue.startDate.getHours();
            });
        });
    }

    public getDate(day: number): Date {
        return new Date(this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day);
    }

    public getTasksForDay(day: number) {
        return this.tasks.filter(task => {
            return task.startDate.toDateString() === this.getDate(day).toDateString();
        });
    }

    public showEditor = () => {
        this._editorService.show();
    }

    public selectDay(day: number, hour?: number) {
        this._dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day,
            hour | 0 || 0,
        ));
    }
}
