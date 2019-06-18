import { EventEmitter, OnInit, Output } from '@angular/core';

export class Dialog implements OnInit {
    @Output() public actionsDialog = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        document.addEventListener( 'keydown', this.closeDialogEscape );
    }

    closeDialogEscape = ( event: KeyboardEvent ): void => {
        if ( event.key === 'Escape' ) {
            this.closeDialog();
        }
    }

    closeDialog(): void {
        this.actionsDialog.emit( { type: 'close' } );
        document.removeEventListener( 'keydown', this.closeDialogEscape );
    }
}
