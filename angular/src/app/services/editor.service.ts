import { Injectable } from '@angular/core';
import { DialogService } from '../components/dialog/dialog/dialog.service';
import { DateService } from './date.service';
import { Task } from '../models/task';
import * as uuid from 'uuid/v4';
import { Time } from '../constants';

@Injectable({
    providedIn: 'root',
})
export class EditorService extends DialogService {
    constructor(private dateService: DateService) {
        super();
    }

    public get date(): Date {
        return this.dateService.date;
    }

    public initial(): Task {
        return this.task
        || {
            id: uuid(),
            name: '',
            startDate: new Date(this.date),
            endDate: new Date(+this.date + Time.HourInMilliseconds)
        };
    }
}
