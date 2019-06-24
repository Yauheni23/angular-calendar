import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { tasksDefault } from '../components/main/constants';

@Injectable( {
    providedIn: 'root',
} )

export class TasksService {
    public cast: Observable<Task[]>;
    private data: BehaviorSubject<Task[]>;
    private _tasks: Task[];

    constructor() {
        this._tasks = tasksDefault;
        this.data = new BehaviorSubject<Task[]>( this._tasks );
        this.cast = this.data.asObservable();
    }

    public createTask( task: Task ): void {
        const id = this._tasks.findIndex( taskStorage =>  taskStorage.id === task.id);
        if ( id !== -1) {
            this._tasks[ id ] = task;
        } else {
            this._tasks.push( task );
        }
        this.data.next( this._tasks );
    }

    public deleteTask( id: string ): void {
        this._tasks = this._tasks.filter( task => {
            return task.id !== id;
        } );
        this.data.next( this._tasks );
    }

    public get tasks(): Task[] {
        return this._tasks;
    }
}
