import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../constants';
import { getArrayDaysInWeek, getTimeZone } from '../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../services/date.service';

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

    constructor( private dateService: DateService ) {
        super();
        this.dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.today = this.displayedDate.getFullYear() === new Date().getFullYear()
            && this.displayedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
        });
    }

    ngOnInit() {
    }

    getDate( day: number ): number {
        return new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getDate();
    }

    getDateOfWeek() {
        return getArrayDaysInWeek( this.displayedDate );
    }

    showEditorTask = ( event: any ) => {
        super.showEditorTask( event );
        this.changePosition( event );
    };

    showViewTask = ( event: any ) => {
        super.showViewTask( event );
        this.changePosition( event );
    };

    private changePosition( event: MouseEvent ) {
        if ( document.body.clientHeight - event.y < 230 ) {
            this.top = document.body.clientHeight - 230;
        } else {
            this.top = event.y;
        }
        this.left = document.body.clientWidth / 2 - 225;
    }

    selectDate(day: number) {
        this.dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day
        ))
    }

}
