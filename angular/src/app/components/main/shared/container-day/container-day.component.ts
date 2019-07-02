import { Component, Input } from '@angular/core';
import { DateService } from '../../../../services/date.service';
import { EditorService } from '../../../../services/editor.service';
import { size } from '../../../../constants';

@Component({
    selector: 'app-container-day',
    templateUrl: './container-day.component.html',
    styleUrls: [ './container-day.component.less' ],
})
export class ContainerDayComponent {
    public readonly heightDay: number = size.heightDay;
    public readonly heightHour: number = size.heightHour;
    public displayedDate: Date;
    @Input() private day: number;

    constructor(private dateService: DateService, private editorService: EditorService) {
        this.dateService.cast.subscribe(data => {
            this.displayedDate = data;
        });
        this.showEditor = this.showEditor.bind(this);
    }

    public showEditor(): void {
        this.editorService.show();
    }

    public selectDay(hour?: number): void {
        this.dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            this.day,
            hour | 0 || 0,
        ));
    }
}
