import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DateService } from '../../services/date.service';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.less' ],
} )
export class HeaderComponent {
    private modeCalendar: string;

    constructor( private router: Router, private dateService: DateService ) {
        this.router.events.subscribe( ( event ) => {
            if ( event instanceof NavigationEnd ) {
                this.modeCalendar = event.urlAfterRedirects.match( /day|week|month/ )[ 0 ];
            }
        } );
    }

    public showToday(): void {
        this.dateService.setDisplayedDate( new Date() );
    }
}
