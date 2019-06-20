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
    constructor(private _editorService: EditorService, private _viewService: ViewService) {}

    public ngOnInit() {
        document.addEventListener(eventListener.KeyDown, this.closeDialogEscape);
    }

    public closeDialog(): void {
        this._editorService.hide();
        this._viewService.hide();
        document.removeEventListener(eventListener.KeyDown, this.closeDialogEscape);
    }

    private closeDialogEscape = (event: KeyboardEvent): void => {
        if (event.key === keyBoard.Escape) {
            this.closeDialog();
        }
    }
}
