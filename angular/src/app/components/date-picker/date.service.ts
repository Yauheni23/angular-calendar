import { BehaviorSubject, Observable } from 'rxjs';

export class DateService {
    public cast: Observable<Date>;
    private currentDate: BehaviorSubject<Date>;
    private readonly dateStringRegExp: RegExp = /([1-9][0-9]{3})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;

    constructor() {
        this.currentDate = new BehaviorSubject<Date>(new Date());
        this.cast = this.currentDate.asObservable();
    }

    public getDateFromString(date: string): Date {
        const newDate = date.match(this.dateStringRegExp);

        return new Date(+newDate[1], +newDate[2] - 1, +newDate[3],
            this.currentDate.value.getHours(), this.currentDate.value.getMinutes(), 0);
    }

    public get date(): Date {
        return this.currentDate.value;
    }

    public set date(date: Date) {
        this.currentDate.next(date);
    }

    public setDateFromString(date: string): void {
        this.date = this.getDateFromString(date);
    }
}
