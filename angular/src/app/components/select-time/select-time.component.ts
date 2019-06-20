import { Component, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'app-select-time',
    templateUrl: './select-time.component.html',
    styleUrls: [ './select-time.component.less' ],
} )
export class SelectTimeComponent implements OnInit {
    public times = [];
    @Input() public timeDefault: Date;
    public timeValue: number;

    constructor() {
        for ( let i = 0; i < 48; i++ ) {
            let hours = '' + ( i / 2 | 0 );
            let minutes = ( i / 2 | 0 ) + '';
            if ( +hours < 10 ) {
                hours = '0' + hours;
            }
            if ( i % 2 ) {
                minutes = '30';
            } else {
                minutes = '00';
            }
            this.times.push( `${hours}:${minutes}` );
        }
    }

    public ngOnInit() {
        this.timeValue = this.timeDefault.getHours() * 2;
        this.setTime(this.timeValue);
    }

    public setTime( value: number) {
        this.timeDefault.setHours( value / 2 ^ 0, value % 2 ? 30 : 0, 0);
    }
}
