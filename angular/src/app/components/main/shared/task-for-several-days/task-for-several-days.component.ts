import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { DateService } from '../../../../services/date.service';

@Component( {
    selector: 'app-task-for-several-days',
    templateUrl: './task-for-several-days.component.html',
    styleUrls: [ './task-for-several-days.component.less' ],
} )
export class TaskForSeveralDaysComponent implements OnInit {
    @Input() isWeek: boolean;
    @Input() task: Task;
    public isVisibleViewTask: boolean;
    public leftSide: boolean;
    public rightSide: boolean;

    constructor(private dateService: DateService) {
    }

    ngOnInit() {
        this.dateService.cast.subscribe(date => {
            if ( this.isWeek ) {
                console.log( 'Is week ?', this.isWeek );
            } else {
                this.leftSide = ( ( +this.task.startDate + -new Date().getTimezoneOffset() * 60000 ) / 86400000 | 0 )
                    < ( ( +date + -new Date().getTimezoneOffset() * 60000 ) / 86400000 | 0 );
                this.rightSide = ( ( +date + -new Date().getTimezoneOffset() * 60000 ) / 86400000 | 0 )
                    < ( ( +this.task.endDate + -new Date().getTimezoneOffset() * 60000 ) / 86400000 | 0 );
            }
        });
    }

    public actionsDialog( action: any ) {
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
