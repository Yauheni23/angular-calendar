import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { calendar } from '../../../constants';
import { getDaysInMonth } from '../../../../utils/date';

@Component( {
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [ './calendar.component.less' ],
} )
export class CalendarComponent implements OnInit {
    public today: number | undefined;
    public months = calendar.MONTH_SHORT;
    public dayOfWeek = calendar.DAYS_OF_WEEK_SHORT;
    public date: Date;
    @Input() displayedDate: Date;
    @Output() hideCalendar = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.date = new Date( this.displayedDate );
        this.today = this.date.getFullYear() === new Date().getFullYear()
        && this.date.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
    }

    getDate( day: number ) {
        return new Date( this.date.getFullYear(), this.date.getMonth(), day ).getDate();
    }

    getDateInMonth() {
        return getDaysInMonth( this.date );
    }

    public getMonth(): number {
        return this.date.getMonth();
    }

    public getFullYear(): number {
        return this.date.getFullYear();
    }

    public setMonth( month: number ): void {
        this.date.setMonth( month );
        this.today = this.date.getFullYear() === new Date().getFullYear()
        && this.date.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
    }

    public setFullYear( event: Event ): void {
        this.date.setFullYear( +( event.target as HTMLInputElement ).value );
        this.today = this.date.getFullYear() === new Date().getFullYear()
        && this.date.getMonth() === new Date().getMonth() ? new Date().getDate() : undefined;
    }

    changeDate( day: number ) {
        this.displayedDate.setFullYear( this.date.getFullYear() );
        this.displayedDate.setMonth( this.date.getMonth() );
        this.displayedDate.setDate( day );
        this.hideCalendar.emit();
    }
}
