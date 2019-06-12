import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../../constants';
import { getTimeZone } from '../../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../../services/date.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: [ './day.component.less' ],
} )

export class DayComponent extends DialogActions implements OnInit {
    public timeZone = getTimeZone();
    private heightDay = size.heightDay;
    public today: number | undefined;

    constructor( private dateService: DateService ) {
        super();
        this.dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.today = this.displayedDate.getFullYear() === new Date().getFullYear()
            && this.displayedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
        });
    }

    getDayOfWeek() {
        return calendar.DAYS_OF_WEEK[ this.displayedDate.getDay() ];
    }

    getDate() {
        return this.displayedDate.getDate();
    }

    ngOnInit() {
    }

    public showEditorTask = ( event: MouseEvent ): void => {
        super.showEditorTask( event );
        this.displayedDate.setHours(event.offsetY / size.heightHour | 0);
    }
}


