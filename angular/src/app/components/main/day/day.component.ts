import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../../constants';
import { getTimeZone } from '../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../../services/date.service';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task';
import { considerSize } from '../../../utils/size';

@Component( {
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: [ './day.component.less' ],
} )

export class DayComponent extends DialogActions implements OnInit {
    public timeZone = getTimeZone();
    public heightDay = size.heightDay;
    public today: number | undefined;
    public tasks: Task[];
    public tasksForSeveralDays: Task[];
    public size: any;

    constructor( private dateService: DateService, private tasksService: TasksService ) {
        super();
        this.dateService.cast.subscribe( date => {
            this.displayedDate = date;
            this.today = this.displayedDate.getFullYear() === new Date().getFullYear()
            && this.displayedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;

            this.tasksService.cast.subscribe( data => {
                this.tasks = data.filter( task => {
                    return this.displayedDate.toDateString() === task.startDate.toDateString()
                        && this.displayedDate.toDateString() === task.endDate.toDateString();
                } );
                this.tasksForSeveralDays = data.filter( task => {
                    return task.startDate.toDateString() !== task.endDate.toDateString()
                        && +task.startDate <= new Date(this.displayedDate).setHours(24)
                        && +task.endDate >= new Date(this.displayedDate).setHours(0, 0, 0, 0);
                } );
                this.tasks.sort( ( a, b ) => {
                    return ( b.endDate.getHours() - b.startDate.getHours() ) - ( a.endDate.getHours() - a.startDate.getHours() );
                } );

                this.size = considerSize( this.tasks );
            } );
        } );
    }

    ngOnInit() {
    }

    getDayOfWeek(): string {
        return calendar.DAYS_OF_WEEK[ this.displayedDate.getDay() ];
    }

    getDate(): number {
        return this.displayedDate.getDate();
    }

    public showEditorTask = ( event: MouseEvent ): void => {
        super.showEditorTask( event );
        this.displayedDate.setHours( event.offsetY / size.heightHour | 0 );
    };
}
