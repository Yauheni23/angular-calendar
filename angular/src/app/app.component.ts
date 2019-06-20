import { Component } from '@angular/core';
import { EditorService } from './services/editor.service';
import { ViewService } from './services/view.service';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
} )
export class AppComponent {
    public isVisibleEditorTask: boolean;
    public isVisibleViewTask: boolean;

    constructor(private _editorTask: EditorService, private _viewTask: ViewService) {
        this._editorTask.cast.subscribe(data => {
            this.isVisibleEditorTask = data;
        });

        this._viewTask.cast.subscribe(data => {
            this.isVisibleViewTask = data;
        });
    }
}
