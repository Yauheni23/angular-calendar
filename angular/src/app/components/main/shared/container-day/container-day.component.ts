import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../../../services/date.service';
import { TasksService } from '../../../../services/tasks.service';
import { EditorService } from '../../../../services/editor.service';
import { size } from '../../../../constants';

@Component({
    selector: 'app-container-day',
    templateUrl: './container-day.component.html',
    styleUrls: [ './container-day.component.less' ],
})
export class ContainerDayComponent implements OnInit {
    public readonly heightDay: number = size.heightDay;
    public readonly heightHour: number = size.heightHour;
    public displayedDate: Date;
    @Input() private day: number;

    constructor(private _dateService: DateService, private _editorService: EditorService) {
        this._dateService.cast.subscribe(data => {
            this.displayedDate = data;
        });
    }

    public ngOnInit() {
    }

    public showEditor = () => {
        this._editorService.show();
    }

    public selectDay(hour?: number) {
        this._dateService.setDisplayedDate(new Date(
            this.displayedDate.getFullYear(),
            this.displayedDate.getMonth(),
            this.day,
            hour | 0 || 0,
        ));
    }
}
