import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Dialog } from '../dialog';
import { FormControl, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';
import * as uuid from 'uuid/v4';

@Component( {
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
} )
export class EditorTaskComponent extends Dialog implements OnInit {
    @Input() private date: Date;
    @ViewChildren( 'input' ) private input: any;
    public id: string = uuid();
    public startDate: Date;
    public endDate: Date;
    public nameFormControl: FormControl = new FormControl( '', [
        Validators.required,
    ] );

    constructor( private tasksService: TasksService ) {
        super();
    }

    public ngOnInit() {
        super.ngOnInit();
        this.startDate = new Date( this.date );
        this.endDate = new Date( this.date );
        this.endDate.setHours( this.endDate.getHours() + 1 );
    }

    public createTask(): void {
        if ( this.nameFormControl.value && this.nameFormControl.value.trim() ) {
            this.tasksService.createTask( {
                id: this.id,
                name: this.nameFormControl.value,
                startDate: this.startDate,
                endDate: this.endDate < this.startDate ? this.startDate : this.endDate,
            } );
            this.closeDialog();
        } else {
            this.nameFormControl.markAsTouched();
            this.input.first.nativeElement.focus();
        }
    }

    public changeStartDate(date: Date): void {
        this.startDate = date;
    }

    public changeEndDate(date: Date): void {
        this.endDate = date;
    }
}
