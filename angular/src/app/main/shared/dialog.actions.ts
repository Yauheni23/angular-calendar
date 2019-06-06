import { EventEmitter, Input, Output } from '@angular/core';

export class DialogActions {
    public isVisibleEditorTask = false;
    public isVisibleViewTask = false;
    public displayedDate = new Date();
    public top: number;
    public left: number;
    @Output() lol = new EventEmitter();
    @Input() pop ;

    public actionsDialog( action: any ) {
        if ( action.type === 'close' ) {
            this.hideEditorTask();
            this.hideViewTask();
        }
    }

    public showEditorTask( event: any ): void {
        this.isVisibleEditorTask = true;
        this.lol.emit();
    }

    public hideEditorTask = (): void => {
        this.isVisibleEditorTask = false;
    };

    public showViewTask( event: any ): void {
        this.isVisibleViewTask = true;
    }

    public hideViewTask = (): void => {
        this.isVisibleViewTask = false;
    };
}
