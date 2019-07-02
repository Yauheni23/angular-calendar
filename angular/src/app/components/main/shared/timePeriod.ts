import { size } from '../../../constants';
import { convertInFormatInput, getTimeZone } from '../../../utils/date';

export abstract class TimePeriod {
    public readonly todayString: string = convertInFormatInput(new Date());
    public readonly timeZone = getTimeZone();
    public readonly heightDay = size.heightDay;
    public readonly heightHour = size.heightHour;
    public displayedDate: Date;

    public get month(): number {
        return this.displayedDate.getMonth();
    }

    public getDate(day: number): Date {
        return new Date(this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day);
    }
}
