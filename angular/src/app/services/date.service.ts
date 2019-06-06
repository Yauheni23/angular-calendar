import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root',
} )
export class DateService {
    private displayedDate = new Date(2018, 10, 1);

    constructor() {
    }

    getDisplayedDate(): Date {
        return this.displayedDate;
    }

    setDisplayedDate(date: Date): void {
        this.displayedDate = date;
    }
}
