import { Component, OnInit } from '@angular/core';
import { getDaysInMonth } from '../../../../utils/date';
import { DialogActions } from '../shared/dialog.actions';
import { DateService } from '../../../services/date.service';
import { calendar } from '../../../constants';

@Component( {
    selector: 'app-month',
    templateUrl: './month.component.html',
    styleUrls: [ './month.component.less' ],
} )
export class MonthComponent extends DialogActions implements OnInit {
    public dateInMonth: number[][];
    public today: number | undefined;
    public daysOfWeek = calendar.DAYS_OF_WEEK;

    constructor( private dateService: DateService ) {
        super();
        this.dateService.cast.subscribe( date => {
            this.displayedDate = date;
            this.dateInMonth = getDaysInMonth( this.displayedDate );
            this.today = this.displayedDate.getFullYear() === new Date().getFullYear()
            && this.displayedDate.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
        } );
    }

    ngOnInit() {
    }

    getDate( day: number ) {
        return new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getDate();
    }

    getMonth( day: number ) {
        return calendar.MONTH_SHORT[new Date( this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day ).getMonth()];
    }

    showEditorTask = ( day: number ) => {
        super.showEditorTask( event );
        this.selectDate(day);
        // if ( event.x < 450 + event.x % ( event.target as HTMLDivElement ).getBoundingClientRect().width ) {
        //     this.left = event.x + ( event.target as HTMLDivElement ).getBoundingClientRect().width
        //         - event.clientX % ( event.target as HTMLDivElement ).getBoundingClientRect().width;
        // } else {
        //     this.left = event.x - 450 - event.clientX % ( event.target as HTMLDivElement ).getBoundingClientRect().width;
        // }
        // if ( document.body.clientHeight - event.y < 230 ) {
        //     this.top = document.body.clientHeight - 230;
        // } else {
        //     this.top = event.y;
        // }
        this.left = 600;
        this.top = 300;
    };

    selectDate(day: number) {
        this.dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            day
        ));
    }
}
