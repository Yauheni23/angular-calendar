import { Component, Input, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { Task } from '../../../models/task';
import { TasksService } from '../../../services/tasks.service';

@Component( {
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: [ './view-task.component.less' ],
} )
export class ViewTaskComponent extends Dialog implements OnInit {
    @Input() task: Task;

    constructor( private tasksService: TasksService ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        document.addEventListener('keydown', this.deleteTaskKey);
    }

    deleteTaskKey = ( event: KeyboardEvent ) => {
        if ( event.key === 'Delete' ) {
            this.deleteTask();
        }
    }

    editTask() {
        this.closeDialog();
    }

    deleteTask() {
        this.tasksService.deleteTask( this.task.id );
        this.closeDialog();
        document.removeEventListener( 'keydown', this.deleteTaskKey );
    }
}
