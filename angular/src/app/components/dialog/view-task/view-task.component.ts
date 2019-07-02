import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { TasksService } from '../../../services/tasks.service';
import { ViewService } from '../../../services/view.service';
import { EditorService } from '../../../services/editor.service';
import { KeyBoard } from '../../constants';

@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: [ './view-task.component.less' ],
})
export class ViewTaskComponent {
    public task: Task;

    constructor(private viewService: ViewService, private editorService: EditorService) {
        this.task = this.viewService.task;
    }

    public editTask(): void {
        this.viewService.hide();
        this.editorService.show(this.task);
    }

    public deleteTask(): void {
        this.viewService.deleteTask(this.task.id);
        this.viewService.hide();
    }

    private deleteTaskKeyboard(key: string): void {
        if (KeyBoard.Delete === key) {
            this.deleteTask();
        }
    }
}
