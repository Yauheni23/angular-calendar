import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../../constants';
import { getArrayDaysInWeek, getTimeZone } from '../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../../services/date.service';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task';
import { considerSize } from '../../../utils/size';

@Component( {
    selector: 'app-week',
    templateUrl: './week.component.html',
    styleUrls: [ './week.component.less' ],
} )
export class WeekComponent extends DialogActions implements OnInit {
    public timeZone = getTimeZone();
    public heightDay = size.heightDay;
    public daysOfWeek = calendar.DAYS_OF_WEEK;
    public today: number | undefined;
    private tasks: Task[];
    private lefts: any;
    private width: number;
    private tasksByDays: Task[][];

    constructor( private dateService: DateService, private tasksService: TasksService ) {
        super();
        this.tasksByDays = [];
        this.dateService.cast.subscribe( date => {
            this.displayedDate = date;
            this.today = this.displayedDate.getFullYear() === new Date().getFullYear()
            && this.displayedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
            this.tasksService.cast.subscribe(data => {
                this.tasks = data;
                this.tasks.sort( ( a, b ) => {
                    return ( b.endDate.getHours() - b.startDate.getHours() ) - ( a.endDate.getHours() - a.startDate.getHours() );
                } );
                this.lefts = considerSize( this.tasks );
                this.tasksByDays = this.getTasksByDays();
                this.width = 98 / this.lefts.size;
            });
        } );
    }

    ngOnInit() {

    }

    getDate( day: number ): Date {
        return new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day );
    }

    getMonth( day: number ) {
        return calendar.MONTH_SHORT[ new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getMonth() ];
    }

    getDateOfWeek() {
        return getArrayDaysInWeek( this.displayedDate );
    }

    getTasksByDays() {
        const days = this.getDateOfWeek();
        const tasksByDays = [];
        for ( let i = 0; i < 7; i++ ) {
            tasksByDays.push( this.tasks.filter( task => {
                return task.startDate.toDateString() ===
                    new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), days[ i ] ).toDateString()
                    && task.startDate.toDateString() === task.endDate.toDateString();
            } ) );
        }
        return tasksByDays;
    }

    showEditorTask = ( event: MouseEvent, day: number ) => {
        super.showEditorTask( event );
        this.selectDate( day, event.offsetY / size.heightHour | 0 );
    }

    selectDate( day: number, hour?: number ) {
        this.dateService.setDisplayedDate( new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day,
            hour || 0,
        ) );
    }

}
