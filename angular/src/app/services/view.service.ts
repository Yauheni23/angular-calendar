import { Injectable } from '@angular/core';
import { DialogService } from '../components/dialog/dialog/dialog.service';
import { DataBaseService } from './db.service';
import { TasksService } from './tasks.service';

@Injectable({
    providedIn: 'root',
})
export class ViewService extends DialogService {
    constructor(private dbService: DataBaseService, private tasksService: TasksService) {
        super();
    }

    public deleteTask(id: string): void {
        this.dbService.deleteTask(id).subscribe(data => {
            if (data.result) {
                this.tasksService.deleteTask(id);
            }
        });
    }
}
