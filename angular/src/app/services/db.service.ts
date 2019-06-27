import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskResponse } from '../models/task';
import { server } from '../constants';
import { Observable } from 'rxjs';

interface IResponseTask {
    payload: TaskResponse[];
}

@Injectable({
    providedIn: 'root',
})
export class DataBaseService {
    private readonly guidesUrl = '/guides';
    private readonly guideUrl = '/guide';

    constructor(private http: HttpClient) { }

    public getTasks(): Observable<IResponseTask> {
        return this.http.get<IResponseTask>(`${server.address}${this.guidesUrl}`);
    }

    public getTaskById(id: string): Observable<TaskResponse> {
        return this.http.get<TaskResponse>(`${server.address}${this.guideUrl}?id=${id}`);
    }

    public createTask(task: Task): Observable<{result: TaskResponse}> {
        return this.http.post<{result: TaskResponse}>(`${server.address}${this.guideUrl}`, task);
    }

    public deleteTask(id: string): Observable<{result: number}> {
        return this.http.delete<{result: number}>(`${server.address}${this.guideUrl}?id=${id}`);
    }
}
