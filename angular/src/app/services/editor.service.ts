import { Injectable } from '@angular/core';
import { DialogService } from '../components/dialog/dialog/dialog.service';
import { DateService } from './date.service';
import { Task } from '../models/task';
import * as uuid from 'uuid/v4';
import { Time } from '../constants';
import { DataBaseService } from './db.service';
import { TasksService } from './tasks.service';

@Injectable({
    providedIn: 'root',
})
export class EditorService extends DialogService {
    private copyTask: Task;

    constructor(private dateService: DateService, private dbService: DataBaseService, private tasksService: TasksService) {
        super();
    }

    private static checkValidationTask(task: Task): Task {
        if (+task.startDate > +task.endDate) {
            task.endDate = new Date(task.startDate);
        }
        return task;
    }

    private static copy(task: Task): Task {
        return { ...task, startDate: new Date(task.startDate), endDate: new Date(task.endDate) };
    }

    public show(task?: Task): void {
        super.show(task);
        if (this.task) {
            this.copyTask = EditorService.copy(task);
        }
    }

    public hide(): void {
        super.hide();
        if (this.copyTask) {
            this.tasksService.saveTask(this.copyTask);
        }
        this.copyTask = undefined;
    }

    public get date(): Date {
        return this.dateService.date;
    }

    public initial(): Task {
        return this.task
            || {
                id: uuid(),
                name: '',
                startDate: new Date(this.date),
                endDate: new Date(+this.date + Time.HourInMilliseconds),
            };
    }

    public saveTask(newTask: Task): void {
        const task = EditorService.checkValidationTask(newTask);
        this.dbService.createTask(task).subscribe(data => {
            if (data.result) {
                this.tasksService.saveTask(task);
            }
        });
    }
}
