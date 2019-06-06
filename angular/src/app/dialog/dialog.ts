import { EventEmitter, Input, OnInit, Output } from '@angular/core';

export class Dialog implements OnInit {
    @Input() top;
    @Input() left;
    @Output() public actionsDialog = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        document.addEventListener( 'keydown', this.closeDialogEscape );
    }

    closeDialogEscape = ( event: KeyboardEvent ) => {
        if ( event.key === 'Escape' ) {
            this.closeDialog();
        }
    }

    closeDialog() {
        this.actionsDialog.emit( { type: 'close' } );
        document.removeEventListener( 'keydown', this.closeDialogEscape );
    }

}
