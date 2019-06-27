import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskResponse } from '../models/task';
import { DataBaseService } from './db.service';
import { convertInFormatInput, isTaskForSeveralDays } from '../utils/date';

@Injectable({
    providedIn: 'root',
})

export class TasksService {
    private data: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    public cast: Observable<Task[]> = this.data.asObservable();
    private _tasks: Task[] = [];

    constructor(private _dbService: DataBaseService) {
        this._dbService.getTasks().subscribe(data => {
            this._tasks = data.payload.map((task: TaskResponse) => {
                task.startDate = new Date(task.startDate);
                task.endDate = new Date(task.endDate);
                return task;
            }) as Task[];
            this.data.next(this._tasks);
        });
    }

    private static checkValidationTask(task: Task): Task {
        if (+task.startDate > +task.endDate) {
            task.endDate = task.startDate;
        }
        return task;
    }

    public createTask(newTask: Task): void {
        this._dbService.createTask(TasksService.checkValidationTask(newTask)).subscribe(data => {
            if (data.result) {
                this._tasks.push(newTask);
                this.data.next(this._tasks);
            }
        });
    }

    public deleteTask(id: string): void {
        this._dbService.deleteTask(id).subscribe(data => {
            if (data.result) {
                this._tasks = this._tasks.filter(task => {
                    return task.id !== id;
                });
                this.data.next(this._tasks);
            }
        });
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
