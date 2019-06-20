import { Component, Input, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { Task } from '../../../models/task';
import { TasksService } from '../../../services/tasks.service';
import { eventListener, keyBoard } from '../../constants';

@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: [ './view-task.component.less' ],
})
export class ViewTaskComponent extends Dialog implements OnInit {
    @Input() public task: Task;

    constructor(private tasksService: TasksService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
        document.addEventListener(eventListener.KeyDown, this.deleteTaskKey);
    }

    public deleteTask(): void {
        this.tasksService.deleteTask(this.task.id);
        this.closeDialog();
    }

    public closeDialog(): void {
        super.closeDialog();
        document.removeEventListener(eventListener.KeyDown, this.deleteTaskKey);
    }

    private deleteTaskKey = (event: KeyboardEvent): void => {
        if (event.key === keyBoard.Delete) {
            this.deleteTask();
        }
    }
}
