import { Component, Input, OnInit } from '@angular/core';
import { size } from '../../../../constants';
import { Task } from '../../../../models/task';
import { ViewService } from '../../../../services/view.service';

@Component( {
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: [ './task.component.less' ],
} )
export class TaskComponent implements OnInit {
    @Input() public task: Task;
    @Input() public displayedDate: Date;
    @Input() public left: number;
    @Input() public width: number;
    public heightHour = size.heightHour;
    private top: number;
    private height: number;

    constructor(private _viewService: ViewService) {
    }

    public ngOnInit() {
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

    public showViewTask(): void {
        this._viewService.show(this.task);
    }
}
