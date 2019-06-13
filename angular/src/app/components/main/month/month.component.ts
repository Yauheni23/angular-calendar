import { Component, OnInit } from '@angular/core';
import { getDaysInMonth } from '../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../../services/date.service';
import { calendar } from '../../../constants';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task';

@Component( {
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: [ './month.component.less' ],
} )
export class MonthComponent extends DialogActions implements OnInit {
    public dateInMonth: number[][];
    public today: number | undefined;
    public tasks: Task[];
    public daysOfWeek = calendar.DAYS_OF_WEEK;

    constructor( private dateService: DateService, private tasksService: TasksService ) {
        super();
        this.dateService.cast.subscribe( date => {
            this.displayedDate = date;
            this.dateInMonth = getDaysInMonth( this.displayedDate );
            this.today = this.displayedDate.getFullYear() === new Date().getFullYear()
            && this.displayedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
        } );
        this.tasksService.getTasks().subscribe(
            data => {
            console.log( data );
        },
            () =>  {
            this.tasks = [{
                id: '1',
                name: 'Error',
                startDate: new Date(),
                endDate: new Date()
            }];
        });
    }

    ngOnInit() {
    }

    getDate( day: number ) {
        return new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getDate();
    }

    getMonth( day: number ) {
        return calendar.MONTH_SHORT[ new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getMonth() ];
    }

    showEditorTask = ( day: number ) => {
        super.showEditorTask( event );
        this.selectDate( day );
    }

    selectDate( day: number ) {
        this.dateService.setDisplayedDate( new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day,
        ) );
    }
}
