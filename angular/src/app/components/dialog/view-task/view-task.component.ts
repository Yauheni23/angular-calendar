import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { TasksService } from '../../../services/tasks.service';
import { ViewService } from '../../../services/view.service';

@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: [ './view-task.component.less' ],
})
export class ViewTaskComponent {
    public task: Task;

    constructor(private _tasksService: TasksService, private _viewService: ViewService) {
        this.task = this._viewService.task;
    }

    public deleteTask(): void {
        this._tasksService.deleteTask(this.task.id);
        this._viewService.hide();
    }
}
