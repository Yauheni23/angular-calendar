import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.less' ],
})
export class ButtonComponent {
    @Output() public toggleCalendar = new EventEmitter();

    public clickButton(): void {
        this.toggleCalendar.emit();
    }
}
