import { Component, Input, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { FormControl, Validators } from '@angular/forms';

@Component( {
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
} )
export class EditorTaskComponent extends Dialog implements OnInit {
    @Input() date;
    public startDate: Date;
    public endDate: Date;
    public nameFormControl: FormControl;

    constructor() {
        super();
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
}
