import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { calendar } from '../../../constants';
import { convertInFormatInput, getDaysInMonth } from '../../../utils/date';
import { DateService } from '../date.service';
import { Class, Color } from '../../main/constants';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [ './calendar.component.less' ],
})
export class CalendarComponent implements OnInit {
    public readonly todayString: string;
    public readonly months = calendar.MONTH_SHORT;
    public readonly dayOfWeek = calendar.DAYS_OF_WEEK_SHORT;
    public date: Date;
    @Output() public hideCalendar = new EventEmitter();
    @Input() private readonly displayedDate: Date;

    constructor(private dateService: DateService) {
        this.todayString = convertInFormatInput(new Date());
    }

    public ngOnInit(): void {
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

    public changeDate(day: number): void {
        this.dateService.date = new Date(this.date.getFullYear(), this.date.getMonth(), day);
        this.hideCalendar.emit();
    }

    public getDayOfMonth(day: number): number {
        return this.getDate(day).getDate();
    }

    public isToday(day: number): string {
        return convertInFormatInput(new Date(this.date.getFullYear(), this.date.getMonth(), day)) === this.todayString ? Class.Today : '';
    }

    public isCurrentMonth(dayOfWeek: number): string {
        return this.month !== this.getDate(dayOfWeek).getMonth() ? Color.Gray : '';
    }

    private getDate(day: number): Date {
        return new Date(this.date.getFullYear(), this.date.getMonth(), day);
    }
}
