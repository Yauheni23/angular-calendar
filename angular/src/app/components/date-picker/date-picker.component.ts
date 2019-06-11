import { Component, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: [ './date-picker.component.less' ],
} )
export class DatePickerComponent implements OnInit {
    @Input() displayedDate: Date;
    public isVisible = false;

    constructor() {
    }

    ngOnInit() {
    }

    changeDate( date: string ): void {
        const newDate = date.match( /([1-9][0-9]{3})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/ );
        if ( newDate ) {
            this.displayedDate = new Date( +newDate[ 1 ], +newDate[ 2 ] - 1, +newDate[ 3 ] );
        }
    }

    toggleCalendar() {
        this.isVisible = !this.isVisible;
        if ( this.isVisible ) {
            document.addEventListener( 'click', this.hideCalendar );
        } else {
            document.removeEventListener( 'click', this.hideCalendar );
        }
    }

    hideCalendar = () => {
        document.removeEventListener( 'click', this.hideCalendar );
        this.isVisible = false;
    };
}
