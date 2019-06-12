import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { calendar } from '../../constants';
import { NavigationEnd, Router } from '@angular/router';
import { DateService } from '../../services/date.service';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.less' ],
} )
export class HeaderComponent implements OnInit {
    public months = calendar.MONTH;
    private displayedDate: Date;
    private modeCalendar: string;

    constructor( private eventManager: EventManager, private router: Router, private dateService: DateService ) {
        this.router.events.subscribe( ( event ) => {
            if ( event instanceof NavigationEnd ) {
                this.modeCalendar = event.urlAfterRedirects.match( /day|week|month/ )[ 0 ];
            }
        } );
        this.eventManager.addGlobalEventListener( 'document', 'keydown', this.addKeyboardEvent );
        this.dateService.cast.subscribe( date => {
            this.displayedDate = date;
        } );
    }

    ngOnInit() {
    }

    public getMonth(): number {
        return this.displayedDate.getMonth();
    }

    public getFullYear(): number {
        return this.displayedDate.getFullYear();
    }

    public setMonth( event: Event ): void {
        this.dateService.setDisplayedDate( new Date( this.displayedDate.setMonth( +( event.target as HTMLSelectElement ).value ) ) );
    }

    public setFullYear( event: Event ): void {
        this.dateService.setDisplayedDate( new Date( this.displayedDate.setFullYear( +( event.target as HTMLInputElement ).value) ) );
    }

    private addKeyboardEvent = ( event: KeyboardEvent ) => {
        if ( event.key === 'ArrowLeft' ) {
            this.changeDisplayedDate( true );
        }
        if ( event.key === 'ArrowRight' ) {
            this.changeDisplayedDate( false );
        }
    };

    public changeDisplayedDate( isPrev: boolean ): void {
        const prevOrNext = isPrev ? -1 : 1;
        switch ( this.modeCalendar ) {
            case 'month':
                this.displayedDate.setMonth( this.displayedDate.getMonth() + prevOrNext );
                break;
            case 'week':
                this.displayedDate.setDate( this.displayedDate.getDate() + prevOrNext * 7 );
                break;
            case 'day':
                this.displayedDate.setDate( this.displayedDate.getDate() + prevOrNext );
                break;
        }
        this.dateService.setDisplayedDate( this.displayedDate );
    }

    public showToday(): void {
        this.dateService.setDisplayedDate( new Date() );
    }
}
