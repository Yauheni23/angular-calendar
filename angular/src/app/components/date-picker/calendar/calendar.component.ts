import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { calendar } from '../../../constants';
import { convertInFormatInput, getDaysInMonth } from '../../../utils/date';
import { DateService } from '../date.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [ './calendar.component.less' ],
})

export class CalendarComponent implements OnInit {
    public readonly months = calendar.MONTH_SHORT;
    public readonly dayOfWeek = calendar.DAYS_OF_WEEK_SHORT;
    @Input() private readonly displayedDate: Date;
    @Output() public hideCalendar = new EventEmitter();
    public todayString: string;
    public date: Date;

    constructor(private dateService: DateService) {
        this.todayString = convertInFormatInput(new Date());
    }

    public ngOnInit() {
        this.date = new Date(this.displayedDate);
    }

    public get year(): number {
        return this.date.getFullYear();
    }

    public get dateInMonth(): number[][] {
        return getDaysInMonth(this.date);
    }

    public get month(): number {
        return this.date.getMonth();
    }

    public setMonth(month: number): void {
        this.date.setMonth(month);
    }

    public setFullYear(event: Event): void {
        this.date.setFullYear(+(event.target as HTMLInputElement).value);
    }

    public changeDate(day: number) {
        this.dateService.date = new Date(this.date.getFullYear(), this.date.getMonth(), day);
        this.hideCalendar.emit();
    }

    public getDayOfMonth(day: number): number {
        return this.getDate(day).getDate();
    }

    public isToday(day: number): string {
        return convertInFormatInput(new Date(this.date.getFullYear(), this.date.getMonth(), day)) === this.todayString ? ' today' : '';
    }

    public isWeekEnd(dayOfWeek: number): string {
        return dayOfWeek === 0 || dayOfWeek === 6 ? 'red' : '';
    }

    public isCurrentMonth(dayOfWeek: number): string {
        return this.month !== this.getDate(dayOfWeek).getMonth() ? 'gray' : '';
    }

    private getDate(day: number): Date {
        return new Date(this.date.getFullYear(), this.date.getMonth(), day);
    }
}
