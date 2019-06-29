import { Component, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Task } from '../../../models/task';
import { EditorService } from '../../../services/editor.service';
import { DateService } from '../../../services/date.service';

@Component({
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
})
export class EditorTaskComponent {
    public task: Task;
    public nameFormControl: FormControl;
    @ViewChildren('input') private input: any;

    constructor(private editorService: EditorService, private dateService: DateService) {
        this.task = this.editorService.initial();
        this.nameFormControl = new FormControl(this.task.name, Validators.required);
    }

    public createTask(): void {
        if (this.nameFormControl.value && this.nameFormControl.value.trim()) {
            this.editorService.saveTask(this.task);
            this.editorService.hide();
        } else {
            this.nameFormControl.markAsTouched();
            this.input.first.nativeElement.focus();
        }
    }

    public changeStartDate(date: Date): void {
        this.task.startDate = new Date(date);
        this.updateViewTask();
    }

    public changeEndDate(date: Date): void {
        this.task.endDate = new Date(date);
        this.updateViewTask();
    }

    public changeName(name: string): void {
        this.task.name = name;
    }

    private updateViewTask(): void {
        this.dateService.setDisplayedDate(this.task.startDate);
    }
}
