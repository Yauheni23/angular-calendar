import { Component, Input, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { FormControl, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import uuid from 'uuid/v4';

@Component( {
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
} )
export class EditorTaskComponent extends Dialog implements OnInit {
    @Input() date;
    @Input() editId?: string;
    public id: string;
    public startDate: Date;
    public endDate: Date;
    public nameFormControl: FormControl;

    constructor(private tasksService: TasksService) {
        super();
        this.id = this.editId || uuid();
        this.nameFormControl = new FormControl( '', [
            Validators.required,
        ] );
    }

    ngOnInit() {
        super.ngOnInit();
        this.startDate = new Date( this.date );
        this.endDate = new Date( this.date );
        this.endDate.setHours(this.endDate.getHours() + 1);
    }

    createTask() {
        this.tasksService.createTask({
            id: this.id,
            name: this.nameFormControl.value,
            startDate: this.startDate,
            endDate: this.endDate
        });
        this.closeDialog();
    }
}
