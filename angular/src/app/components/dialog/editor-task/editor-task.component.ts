import { Component, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task';
import { EditorService } from '../../../services/editor.service';

@Component({
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
})
export class EditorTaskComponent {
    public task: Task;
    public nameFormControl: FormControl;
    @ViewChildren('input') private input: any;

    constructor(private tasksService: TasksService, private editorService: EditorService) {
        this.task = this.editorService.initial();
        this.nameFormControl = new FormControl(this.task.name, Validators.required);
    }

    public createTask(): void {
        if (this.nameFormControl.value && this.nameFormControl.value.trim()) {
            this.tasksService.createTask(this.task);
            this.editorService.hide();
        } else {
            this.nameFormControl.markAsTouched();
            this.input.first.nativeElement.focus();
        }
    }

    public changeStartDate(date: Date): void {
        this.task.startDate = date;
    }

    public changeEndDate(date: Date): void {
        this.task.endDate = date;
    }

    public changeName(name: string): void {
        this.task.name = name;
    }
}
