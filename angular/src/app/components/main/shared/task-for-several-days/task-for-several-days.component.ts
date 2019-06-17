import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { DateService } from '../../../../services/date.service';
import { convertInFormatInput, getArrayDaysInWeek } from '../../../../utils/date';

@Component( {
    selector: 'app-task-for-several-days',
    templateUrl: './task-for-several-days.component.html',
    styleUrls: [ './task-for-several-days.component.less' ],
} )
export class TaskForSeveralDaysComponent implements OnInit {
    @Input() isWeek: boolean;
    @Input() task: Task;
    @Input() displayedDate?: Date;
    public isVisibleViewTask: boolean;
    public leftSide: boolean;
    public rightSide: boolean;
    public width: number;

    constructor( private dateService: DateService ) {
    }

    ngOnInit() {
        this.dateService.cast.subscribe( date => {
            if ( this.isWeek ) {
                this.width = considerWidth( this.task, this.displayedDate );
                const week = getArrayDaysInWeek( this.displayedDate );
                this.leftSide = convertInFormatInput( this.task.startDate )
                    < convertInFormatInput( new Date( date.getFullYear(), date.getMonth(), week[ 0 ] ) );
                this.rightSide = convertInFormatInput( new Date( date.getFullYear(), date.getMonth(), week[ 6 ] ) )
                    < convertInFormatInput( this.task.endDate );
            } else {
                this.width = 100;
                this.leftSide = convertInFormatInput( this.task.startDate ) < convertInFormatInput( date );
                this.rightSide = convertInFormatInput( date ) < convertInFormatInput( this.task.endDate );
            }
        } );
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
    };
}

function considerWidth( task: Task, displayedDate: Date ) {
    let start = 8;
    if ( convertInFormatInput( task.startDate ) <= convertInFormatInput( displayedDate ) ) {
        start = displayedDate.getDay();
    }

    let end = task.endDate.getDay();
    if ( convertInFormatInput( new Date( displayedDate.setDate( displayedDate.getDate() + ( 6 - displayedDate.getDay() ) ) ) )
        <= convertInFormatInput( task.endDate ) ) {
        end = 6;
    }

    return 100 * ( end - start + 1 );
}
