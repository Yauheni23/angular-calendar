import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from '../dialog';

@Component( {
    selector: 'app-editor-task',
    templateUrl: './editor-task.component.html',
    styleUrls: [ './editor-task.component.less' ],
} )
export class EditorTaskComponent extends Dialog implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
