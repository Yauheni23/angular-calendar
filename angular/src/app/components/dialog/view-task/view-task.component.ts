import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task';
import { TasksService } from '../../../services/tasks.service';
import { eventListener, keyBoard } from '../../constants';
import { ViewService } from '../../../services/view.service';

@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: [ './view-task.component.less' ],
})
export class ViewTaskComponent implements OnInit {
    public task: Task;

    constructor(private tasksService: TasksService, private _viewService: ViewService) {
        this.task = this._viewService.task;
    }

    public ngOnInit(): void {
        document.addEventListener(eventListener.KeyDown, this.deleteTaskKey);
    }

    public deleteTask(): void {
        this.tasksService.deleteTask(this.task.id);
        this._viewService.hide();
    }

    private deleteTaskKey = (event: KeyboardEvent): void => {
        if (event.key === keyBoard.Delete) {
            this.deleteTask();
        }
    }
}
