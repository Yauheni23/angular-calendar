import { Component, OnInit } from '@angular/core';
import { eventListener, keyBoard } from '../../constants';
import { EditorService } from '../../../services/editor.service';
import { ViewService } from '../../../services/view.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.less' ],
})
export class DialogComponent implements OnInit {
    constructor(private editorService: EditorService, private viewService: ViewService) {
        this.closeDialogEscape = this.closeDialogEscape.bind(this);
    }

    public ngOnInit(): void {
        document.addEventListener(eventListener.KeyDown, this.closeDialogEscape);
    }

    public closeDialog(): void {
        this.editorService.hide();
        this.viewService.hide();
        document.removeEventListener(eventListener.KeyDown, this.closeDialogEscape);
    }

    private closeDialogEscape(event: KeyboardEvent): void {
        if (event.key === keyBoard.Escape) {
            this.closeDialog();
        }
    }
}
