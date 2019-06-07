import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
    providedIn: 'root',
} )
export class DateService {
    private displayedDate = new Date();
    private date = new BehaviorSubject<Date>(new Date());
    public cast = this.date.asObservable();

    constructor() {
    }

    getDisplayedDate(): Date {
        return this.displayedDate;
    }

    setDisplayedDate( date: Date ): void {
        this.date.next(date);
    }

}
