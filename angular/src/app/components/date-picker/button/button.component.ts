import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component( {
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.less' ],
} )
export class ButtonComponent implements OnInit {
    @Output() toggleCalendar = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    clickButton() {
        this.toggleCalendar.emit();
    }
}
