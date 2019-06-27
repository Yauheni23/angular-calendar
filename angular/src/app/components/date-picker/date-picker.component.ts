import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateService } from './date.service';
import { eventListener } from '../constants';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: [ './date-picker.component.less' ],
    providers: [ DateService ],
})
export class DatePickerComponent implements OnInit {
    public isVisible: boolean = false;
    @Output() public changeDate: EventEmitter<Date> = new EventEmitter();
    @Input() private defaultDate?: Date;
    private displayedDate: Date;

    constructor(private dateService: DateService) {
        this.hideCalendar = this.hideCalendar.bind(this);
    }

    public ngOnInit(): void {
        this.dateService.date = this.defaultDate || new Date();
        this.dateService.cast.subscribe(date => {
            this.displayedDate = date;
            this.changeDate.emit(this.displayedDate);
        });
    }

    public selectDate(date: string): void {
        this.dateService.setDateFromString(date);
    }

    public toggleCalendar(): void {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            document.addEventListener(eventListener.MouseDown, this.hideCalendar);
        } else {
            document.removeEventListener(eventListener.MouseDown, this.hideCalendar);
        }
    }

    public hideCalendar(): void  {
        document.removeEventListener(eventListener.MouseDown, this.hideCalendar);
        this.isVisible = false;
    }
}
