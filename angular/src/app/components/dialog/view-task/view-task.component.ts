import { Component, OnInit } from '@angular/core';
import { Dialog } from '../dialog';

@Component( {
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: [ './view-task.component.less' ],
} )
export class ViewTaskComponent extends Dialog implements OnInit {
    public startDate = new Date();
    public endDate = new Date();

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
