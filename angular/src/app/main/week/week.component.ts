import { Component, OnInit } from '@angular/core';
import { calendar, size } from '../../constants';
import { getArrayDaysInWeek, getTimeZone } from '../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';

@Component( {
    selector: 'app-week',
    templateUrl: './week.component.html',
    styleUrls: [ './week.component.less' ],
} )
export class WeekComponent extends DialogActions implements OnInit {
    public timeZone = getTimeZone();
    private heightDay = size.heightDay;
    public daysOfWeek = calendar.DAYS_OF_WEEK;
    public dateOfWeek = getArrayDaysInWeek( this.displayedDate );

    ngOnInit() {
    }

    getDate( day: number ): number {
        return new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getDate();
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

}
