import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { tasksDefault } from '../components/main/constants';

@Injectable( {
    providedIn: 'root',
} )

export class TasksService {
    public tasks: Task[];
    private data: BehaviorSubject<Task[]>;
    public cast: Observable<Task[]>;

    constructor() {
        this.tasks = tasksDefault;
        this.data = new BehaviorSubject<Task[]>( this.tasks );
        this.cast = this.data.asObservable();
    }

    public createTask( task: Task ): void {
        const id = this.tasks.findIndex( taskStorage =>  taskStorage.id === task.id);
        if ( id !== -1) {
            this.tasks[ id ] = task;
        } else {
            this.tasks.push( task );
        }
        this.data.next( this.tasks );
    }

    public deleteTask( id: string ): void {
        this.tasks = this.tasks.filter( task => {
            return task.id !== id;
        } );
        this.data.next( this.tasks );
    }
}
