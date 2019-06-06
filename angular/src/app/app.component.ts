import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
} )
export class AppComponent {
    title = 'Angular-calendar';

    constructor( private router: Router ) {
        this.router.events.subscribe(event => {
            console.log(event);
        })
    }
}
