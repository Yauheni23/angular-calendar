import { Component, Input } from '@angular/core';
import { calendar } from '../../../constants';
import { eventListener } from '../../constants';

@Component({
    selector: 'app-select-mode',
    templateUrl: './select-mode.component.html',
    styleUrls: [ './select-mode.component.less' ],
})
export class SelectModeComponent {
    public readonly modes: string[] = calendar.MODES;
    public isVisible: boolean = false;
    @Input() private selectedMode: string;

    public selectMode(mode: string): void {
        this.selectedMode = mode;
    }

    public toggleMenu(event: Event): void {
        event.stopPropagation();
        if (this.isVisible) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    private showMenu = (): void => {
        this.isVisible = true;
        document.addEventListener(eventListener.Click, this.hideMenu);
    }

    private hideMenu = (): void => {
        this.isVisible = false;
        document.removeEventListener(eventListener.Click, this.hideMenu);
    }
}
