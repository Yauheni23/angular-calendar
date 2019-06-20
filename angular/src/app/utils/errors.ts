import { ErrorStateMatcher } from '@angular/material';
import { FormControl } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    public isErrorState( control: FormControl | null ): boolean {
        return !!( control && control.invalid && ( control.dirty || control.touched ) );
    }
}