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

    constructor(private dateService: DateService, private tasksService: TasksService, private editorService: EditorService) {
        super();
        this.dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.dateInMonth = getDaysInMonth(this.displayedDate);
        });
        this.tasksService.cast.subscribe(data => {
            this.tasks = data.sort((currentValue, nextValue) => {
                return currentValue.startDate.getHours() - nextValue.startDate.getHours();
            });
        });
        this.showEditor = this.showEditor.bind(this);
    }

    public getTasksForDay(day: number): Task[] {
        return this.tasks.filter(task => {
            return task.startDate.toDateString() === this.getDate(day).toDateString();
        });
    }

    public showEditor(day: number): void {
        this.editorService.show();
        this.selectDay(day);
    }

    public selectDay(day: number, hour?: number): void {
        this.dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day,
            hour | 0 || 0,
        ));
    }
}
