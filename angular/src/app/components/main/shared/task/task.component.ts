import { Component, Input, OnInit } from '@angular/core';
import { size } from '../../../../constants';
import { Task } from '../../../../models/task';

@Component( {
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: [ './task.component.less' ],
} )
export class TaskComponent implements OnInit {
    @Input() task: Task;
    @Input() displayedDate: Date;
    @Input() left: number;
    @Input() width: number;
    public heightHour = size.heightHour;
    public top: number;
    public height: number;
    public isVisibleViewTask: boolean;

    constructor() {
    }

    ngOnInit() {
        this.top = 0;
        if ( this.displayedDate.toDateString() === this.task.startDate.toDateString() ) {
            this.top = ( this.task.startDate.getHours() + this.task.startDate.getMinutes() / 60 ) * this.heightHour;
            if ( this.displayedDate.toDateString() === this.task.endDate.toDateString() ) {
                this.height = ( ( +this.task.endDate - +this.task.startDate ) / 1800000 | 0 ) * this.heightHour / 2 || this.heightHour / 2;
            } else {
                this.height = this.heightHour * 24 - this.top;
            }
        } else {
            if ( this.displayedDate.toDateString() === this.task.endDate.toDateString() ) {
                this.height = ( this.task.endDate.getHours() + this.task.endDate.getMinutes() / 60 ) * this.heightHour
                    || this.heightHour / 2;
            } else {
                this.height = this.heightHour * 24;
            }
        }
    }

    public actionsDialog( action: any ): void {
        if ( action.type === 'close' ) {
            this.hideViewTask();
        }
    }

    public showViewTask(): void {
        this.isVisibleViewTask = true;
    }

    public hideViewTask = (): void => {
        this.isVisibleViewTask = false;
    }
}
