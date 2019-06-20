import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ViewService } from '../../../../services/view.service';

@Component({
    selector: 'app-task-for-month',
    templateUrl: './task-for-month.component.html',
    styleUrls: [ './task-for-month.component.less' ],
})
export class TaskForMonthComponent {
    @Input() public task: Task;

    constructor(private _viewService: ViewService) {
    }

    public showTask(): void {
        this._viewService.show(this.task);
    }
}
