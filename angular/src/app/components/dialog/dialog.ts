import { EventEmitter, OnInit, Output } from '@angular/core';
import { eventListener, keyBoard } from '../constants';

export class Dialog implements OnInit {
    @Output() public actionsDialog = new EventEmitter();

    public ngOnInit() {
        document.addEventListener(eventListener.KeyDown, this.closeDialogEscape);
    }

    public closeDialog(): void {
        this.actionsDialog.emit({ type: 'close' });
        document.removeEventListener(eventListener.KeyDown, this.closeDialogEscape);
    }

    private closeDialogEscape = (event: KeyboardEvent): void => {
        if (event.key === keyBoard.Escape) {
            this.closeDialog();
        }
    }
}
