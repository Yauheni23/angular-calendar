import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
    providedIn: 'root',
} )
export class DateService {
    private date = new BehaviorSubject<Date>( new Date() );
    public cast = this.date.asObservable();

    constructor() {
    }

    setDisplayedDate( date: Date ): void {
        this.date.next( date );
    }
}
