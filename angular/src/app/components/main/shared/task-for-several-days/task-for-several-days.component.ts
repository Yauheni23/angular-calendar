import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { DateService } from '../../../../services/date.service';
import { convertInFormatInput, getArrayDaysInWeek } from '../../../../utils/date';
import { ViewService } from '../../../../services/view.service';
import { considerWidth } from '../../../../utils/size';

@Component({
    selector: 'app-task-for-several-days',
    templateUrl: './task-for-several-days.component.html',
    styleUrls: [ './task-for-several-days.component.less' ],
})
export class TaskForSeveralDaysComponent implements OnInit {
    @Input() public isWeek: boolean;
    @Input() public task: Task;
    @Input() public displayedDate?: Date;
    public leftSide: boolean;
    public rightSide: boolean;
    public width: number;

    constructor(private _dateService: DateService, private _viewService: ViewService) {
    }

    public ngOnInit() {
        this._dateService.cast.subscribe(date => {
            const week = getArrayDaysInWeek(this.displayedDate);
            this.leftSide = convertInFormatInput(this.task.startDate)
                < convertInFormatInput(this.isWeek ? new Date(date.getFullYear(), date.getMonth(), week[0]) : date);
            this.rightSide = convertInFormatInput(this.isWeek ? new Date(date.getFullYear(), date.getMonth(), week[6]) : date)
                < convertInFormatInput(this.task.endDate);
            this.width = this.displayedDate ? considerWidth(this.task, new Date(this.displayedDate)) : 100;
        });
    }

    public showViewTask(): void {
        this._viewService.show(this.task);
    }
}
