import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../../constants';
import { getArrayDaysInWeek, getTimeZone } from '../../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../../services/date.service';

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

    getMonth( day: number ) {
        return calendar.MONTH_SHORT[new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getMonth()];
    }

    getDateOfWeek() {
        return getArrayDaysInWeek( this.displayedDate );
    }

    showEditorTask = ( event: MouseEvent, day: number ) => {
        super.showEditorTask( event );
        this.selectDate(day, event.offsetY / size.heightHour | 0);
    }

    selectDate(day: number, hour?: number) {
        this.dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day,
            hour
        ));
    }

}
