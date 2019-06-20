import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../../models/task';

export abstract class DialogService {
    public cast: Observable<boolean>;
    private data: BehaviorSubject<boolean>;
    private _task: Task;

    protected constructor() {
        this.data = new BehaviorSubject(false);
        this.cast = this.data.asObservable();
    }

    public show(task?: Task): void {
        this.data.next(true);
        this.task = task;
    }

    public hide(): void {
        this.data.next(false);
    }

    public get task(): Task {
        return this._task;
    }

    public set task(task: Task) {
        this._task = task;
    }
}
