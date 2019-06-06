import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../constants';
import { getTimeZone } from '../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../services/date.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: [ './day.component.less' ],
} )

export class DayComponent extends DialogActions implements OnInit {
    public timeZone = getTimeZone();
    private heightDay = size.heightDay;
    public dayOfWeek = calendar.DAYS_OF_WEEK[ this.displayedDate.getDay() ];
    public dateOfWeek = this.displayedDate.getDate();

    constructor(private dateService: DateService) {
        super();
    }

    ngOnInit() {
    }

    public showEditorTask = ( event: MouseEvent ): void => {
        super.showEditorTask( event );
        this.changePosition(event);
        this.dateService.setDisplayedDate(new Date(1111));
    }

    public showViewTask = ( event: MouseEvent ): void => {
        super.showViewTask( event );
        this.changePosition(event);
    }

    private changePosition(event: MouseEvent  ) {
        if ( document.body.clientHeight - event.y < 230 ) {
            this.top = document.body.clientHeight - 230;
        } else {
            this.top = event.y;
        }
        this.left = document.body.clientWidth / 2 - 225;
    }
}


