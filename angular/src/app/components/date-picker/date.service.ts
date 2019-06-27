import { BehaviorSubject, Observable } from 'rxjs';

export class DateService {
    public cast: Observable<Date>;
    private currentDate: BehaviorSubject<Date>;

    constructor() {
        this.currentDate = new BehaviorSubject<Date>(new Date());
        this.cast = this.currentDate.asObservable();
    }

    public static getDateFromString(date: string): Date {
        const newDate = date.match(/([1-9][0-9]{3})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/);
        if (newDate) {
            return new Date(+newDate[1], +newDate[2] - 1, +newDate[3]);
        }

        return new Date();
    }

    public get date(): Date {
        return this.currentDate.value;
    }

    public set date(date: Date) {
        this.currentDate.next(date);
    }

    public setDateFromString(date: string): void {
        this.date = DateService.getDateFromString(date);
    }
}
