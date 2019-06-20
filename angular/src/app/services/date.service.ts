import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root',
} )
export class DateService {
    private data: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    public cast: Observable<Date> = this.data.asObservable();

    constructor() {
    }

    public setDisplayedDate( date: Date ): void {
        this.data.next(date);
    }

    public get date(): Date {
        return this.data.value;
    }
}
