import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { convertInFormatInput, validateDateFromInput } from '../../../utils/date';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState( control: FormControl | null ): boolean {
        return !!( control && control.invalid && ( control.dirty || control.touched ) );
    }
}

@Component( {
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.less' ],
} )
export class InputComponent implements OnInit {
    @Input() displayedDate: Date;
    @Output() changeDisplayedDate = new EventEmitter();
    public matcher = new MyErrorStateMatcher();
    emailFormControl = new FormControl( this.getDate(), [
        Validators.required,
        DateValidator,
    ] );

    constructor() {
    }

    ngOnInit() {
    }

    getDate(): string {
        return convertInFormatInput( this.displayedDate || new Date() );
    }

    changeDate( event: Event ): void {
        this.changeDisplayedDate.emit( ( event.target as HTMLInputElement ).value );
    }

}

function DateValidator( control: AbstractControl ): { [ key: string ]: boolean } | null {
    if ( !validateDateFromInput( control.value ) ) {
        return { date: true };
    }
    return null;
}
