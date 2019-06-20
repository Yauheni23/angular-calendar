import { Component } from '@angular/core';
import { EditorService } from './services/editor.service';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
} )
export class AppComponent {
    public isVisibleEditorTask: boolean;
    public isVisibleViewTask: boolean;

    constructor(private _editorTask: EditorService) {
        this._editorTask.cast.subscribe(data => {
            this.isVisibleEditorTask = data;
        });

        // this._editorTask.cast.subscribe(data => {
        //     this.isVisibleViewTask = data;
        // });
    }
}
