import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createTimeMenu } from '../../utils/date';

@Component( {
    selector: 'app-select-time',
    templateUrl: './select-time.component.html',
    styleUrls: [ './select-time.component.less' ],
} )
export class SelectTimeComponent implements OnInit {
    @Input() public timeDefault: Date;
    @Output() public changeDate: EventEmitter<Date> = new EventEmitter();
    public times: string[];
    public timeValue: number;

    constructor() {
        this.times = createTimeMenu();
    }

    public ngOnInit(): void {
        this.timeValue = this.timeDefault.getHours() * 2 + this.timeDefault.getMinutes() / 30 | 0;
        this.setTime(this.timeValue);
    }

    public setTime( value: number): void {
        this.timeDefault.setHours( value / 2 ^ 0, value % 2 ? 30 : 0, 0);
        this.changeDate.emit(this.timeDefault);
    }
}
