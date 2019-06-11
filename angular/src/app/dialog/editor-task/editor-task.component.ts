import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from '../dialog';

@Component( {
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
} )
export class EditorTaskComponent extends Dialog implements OnInit {
    private startDate = new Date(2015, 10, 15);
    private endDate = new Date();
    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
