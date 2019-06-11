import { Component } from '@angular/core';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
} )
export class AppComponent {
    private startDate = new Date(2015, 10, 15);
    private endDate = new Date();
    constructor() {
    }
}
