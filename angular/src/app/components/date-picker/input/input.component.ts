import { Component, EventEmitter, Input, Output } from '@angular/core';
import { convertInFormatInput } from '../../../utils/date';
import { FormControl, Validators } from '@angular/forms';
import { DateStringValidator } from '../../../utils/validators';
import { MyErrorStateMatcher } from '../../../utils/errors';

@Component( {
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.less' ],
} )
export class InputComponent {
    private readonly MAX_LENGTH_STRING_DATE: number = 10;
    @Input() private readonly displayedDate: Date;
    @Output() public changeDisplayedDate: EventEmitter<string> = new EventEmitter();
    public matcher = new MyErrorStateMatcher();
    public dateFormControl: FormControl = new FormControl( this.date, [
        Validators.required,
        DateStringValidator,
    ] );

    public get date(): string {
        return convertInFormatInput( this.displayedDate || new Date() );
    }

    public changeDate( event: Event ): void {
        this.changeDisplayedDate.emit( ( event.target as HTMLInputElement ).value );
    }
}
