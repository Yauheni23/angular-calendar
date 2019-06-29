import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { DataBaseService } from './db.service';
import { convertInFormatInput, isTaskForSeveralDays } from '../utils/date';

@Injectable({
    providedIn: 'root',
})

export class TasksService {
    public cast: Observable<Task[]>;
    private data: BehaviorSubject<Task[]>;
    private _tasks: Task[] = [];

    constructor(private dbService: DataBaseService) {
        this.data = new BehaviorSubject<Task[]>([]);
        this.cast = this.data.asObservable();
        this.dbService.getTasks().subscribe(data => {
            this._tasks = data;
            this.data.next(this._tasks);
        });
    }

    public saveTask(task: Task): void {
        const id = this._tasks.findIndex(_task => _task.id === task.id);
        if (id !== -1) {
            this._tasks[id] = task;
        } else {
            this._tasks.push(task);
        }
        this.data.next(this._tasks);
    }

    public deleteTask(id: string): void {
        this._tasks = this._tasks.filter(task => {
            return task.id !== id;
        });
        this.data.next(this._tasks);
    }

    public getTaskForDay(date: Date): Task[] {
        return this._tasks.filter(task => {
            return task.startDate.toDateString() === date.toDateString() && task.endDate.toDateString() === date.toDateString();
        }).sort((current, next) => {
            return (next.endDate.getHours() - next.startDate.getHours()) - (current.endDate.getHours() - current.startDate.getHours());
        });
    }

    public getTaskForSeveralDays(date: Date): Task[] {
        return this._tasks.filter(task => isTaskForSeveralDays(task, date))
            .sort((current, next) => {
                return (next.endDate.getHours() - next.startDate.getHours()) - (current.endDate.getHours() - current.startDate.getHours());
            });
    }

    public getTaskForSeveralDaysOfWeek(date: Date): Task[] {
        return this.getTaskForSeveralDays(date).filter(task => {
            return date.getDay() === 0 || convertInFormatInput(task.startDate) === convertInFormatInput(date);
        });
    }
}
