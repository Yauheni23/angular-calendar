import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { server } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class DataBaseService {
    private readonly guidesUrl = '/guides';
    private readonly guideUrl = '/guide';

    constructor(private http: HttpClient) { }

    public getTasks(): Observable<any> {
        return this.http.get(`${server.address}${this.guidesUrl}`);
    }

    public getTaskById(id: string): Observable<any> {
        return this.http.get(`${server.address}${this.guideUrl}?id=${id}`);
    }

    public createTask(task: Task): Observable<any> {
        return this.http.post(`${server.address}${this.guideUrl}`, task);
    }

    public deleteTask(id: string): Observable<any> {
        return this.http.delete(`${server.address}${this.guideUrl}?id=${id}`);
    }
}
