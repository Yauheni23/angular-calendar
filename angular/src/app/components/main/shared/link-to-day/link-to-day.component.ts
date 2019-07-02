import { Component, Input } from '@angular/core';
import { DateService } from '../../../../services/date.service';
import { convertInFormatInput } from '../../../../utils/date';
import { calendar } from '../../../../constants';
import { Class, Color } from '../../constants';

@Component({
    selector: 'app-link-to-day',
    templateUrl: './link-to-day.component.html',
    styleUrls: [ './link-to-day.component.less' ],
})
export class LinkToDayComponent {
    public readonly todayString: string = convertInFormatInput(new Date());
    public displayedDate: Date;
    @Input() private day: number;

    constructor(private dateService: DateService) {
        this.dateService.cast.subscribe(data => this.displayedDate = data);
    }

    public selectDay(day: number): void {
        this.dateService.setDisplayedDate(new Date(this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day));
    }

    public isToday(day: number): string {
        return convertInFormatInput(this.getDate(day)) === this.todayString ? Class.Today : '';
    }

    public isCurrentMonth(dayOfWeek: number): string {
        return this.displayedDate.getMonth() !== this.getDate(dayOfWeek).getMonth() ? Color.DifferentMonth : '';
    }

    public getMonthName(day: number): string {
        return this.getDate(day).getDate() === 1 ? calendar.MONTH_SHORT[this.getDate(day).getMonth()] : '';
    }

    private getDate(day: number): Date {
        return new Date(this.displayedDate.getFullYear(), this.displayedDate.getMonth(), day);
    }
}
