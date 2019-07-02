import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskResponse } from '../models/task';
import { Server } from '../constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DataBaseService {
    private readonly guidesUrl: string = `${Server.Address}/guides`;
    private readonly guideUrl: string = `${Server.Address}/guide`;

    constructor(private http: HttpClient) {
    }

    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.guidesUrl).pipe(map(tasks => {
            if (!tasks) {
                return [];
            }
            return tasks.map(task => {
                task.startDate = new Date(task.startDate);
                task.endDate = new Date(task.endDate);
                return task;
            });
        }));
    }

    public getTaskById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.guideUrl}?id=${id}`).pipe(map(task => {
            task.startDate = new Date(task.startDate);
            task.endDate = new Date(task.endDate);
            return task;
        }));
    }

    public createTask(task: Task): Observable<{ result: TaskResponse }> {
        return this.http.post<{ result: TaskResponse }>(this.guideUrl, task);
    }

    public deleteTask(id: string): Observable<{ result: number }> {
        return this.http.delete<{ result: number }>(`${this.guideUrl}?id=${id}`);
    }
}
