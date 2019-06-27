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

    constructor(private tasksService: TasksService, private viewService: ViewService) {
        this.task = this.viewService.task;
    }

    public deleteTask(): void {
        this.tasksService.deleteTask(this.task.id);
        this.viewService.hide();
    }
}
