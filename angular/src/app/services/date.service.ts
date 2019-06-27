import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root',
} )
export class DateService {
    public cast: Observable<Date>;
    private data: BehaviorSubject<Date>;

    constructor() {
        this.data = new BehaviorSubject<Date>(new Date());
        this.cast = this.data.asObservable();
    }

    public setDisplayedDate( date: Date ): void {
        this.data.next(date);
    }

    public get date(): Date {
        return this.data.value;
    }
}
