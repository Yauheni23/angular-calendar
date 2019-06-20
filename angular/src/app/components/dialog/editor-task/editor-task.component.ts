import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Dialog } from '../dialog';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task';
import { EditorService } from '../../../services/editor.service';

@Component({
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
})
export class EditorTaskComponent extends Dialog implements OnInit {
    public task: Task;
    public nameFormControl: FormControl;
    @ViewChildren('input') private input: any;

    constructor(private tasksService: TasksService, private _editorService: EditorService) {
        super();
        this.task = this._editorService.initial();
        this.nameFormControl = new FormControl(this.task.name, Validators.required);
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public createTask(): void {
        if (this.nameFormControl.value && this.nameFormControl.value.trim()) {
            this.tasksService.createTask(this.task);
            this._editorService.hide();
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
