import { Component, Input } from '@angular/core';
import { calendar } from '../../../constants';
import { DateService } from '../../../services/date.service';
import { eventListener } from '../../constants';
import { changeDate } from '../../../utils/date';

@Component({
    selector: 'app-changer-date',
    templateUrl: './changer-date.component.html',
    styleUrls: [ './changer-date.component.less' ],
})
export class ChangerDateComponent {
    public readonly months: string[] = calendar.MONTH;
    @Input() private selectedMode: string;
    private displayedDate: Date;

    constructor(private _dateService: DateService) {
        this._dateService.cast.subscribe(data => this.displayedDate = new Date(data));
        document.addEventListener(eventListener.KeyDown, this.addKeyboardEvent);
    }

    public getMonth(): number {
        return this.displayedDate.getMonth();
    }

    public getFullYear(): number {
        return this.displayedDate.getFullYear();
    }

    public setMonth(event: Event): void {
        this._dateService.setDisplayedDate(new Date(this.displayedDate.setMonth(+(event.target as HTMLSelectElement).value)));
    }

    public setFullYear(event: Event): void {
        this._dateService.setDisplayedDate(new Date(this.displayedDate.setFullYear(+(event.target as HTMLInputElement).value)));
    }

    public changeDisplayedDate(isPrev: boolean): void {
        changeDate(this.displayedDate, this.selectedMode, isPrev);
        this._dateService.setDisplayedDate(this.displayedDate);
    }

    private addKeyboardEvent = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            this.changeDisplayedDate(true);
        }
        if (event.key === 'ArrowRight') {
            this.changeDisplayedDate(false);
        }
    }
}
