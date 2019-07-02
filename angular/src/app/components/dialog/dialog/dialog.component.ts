import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventListener, KeyBoard } from '../../constants';
import { EditorService } from '../../../services/editor.service';
import { ViewService } from '../../../services/view.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: [ './dialog.component.less' ],
})
export class DialogComponent implements OnInit {
    @Output() public eventKeyBoard: EventEmitter<string> = new EventEmitter();
    @Input() private keyboard: string[];

    constructor(private editorService: EditorService, private viewService: ViewService) {
        this.addKeyboardEvents = this.addKeyboardEvents.bind(this);
    }

    public ngOnInit(): void {
        document.addEventListener(EventListener.KeyDown, this.addKeyboardEvents);
    }

    public closeDialog(): void {
        this.editorService.hide();
        this.viewService.hide();
        document.removeEventListener(EventListener.KeyDown, this.addKeyboardEvents);
    }

    private addKeyboardEvents(event: KeyboardEvent): void {
        if (event.key === KeyBoard.Escape) {
            this.closeDialog();
        }
        this.keyboard.forEach( key => {
            if (event.key === key) {
                this.eventKeyBoard.emit(key);
            }
        });
    }
}
