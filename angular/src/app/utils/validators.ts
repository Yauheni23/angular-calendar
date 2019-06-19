import { AbstractControl } from '@angular/forms';
import { validateDateFromInput } from './date';

export function DateStringValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!validateDateFromInput(control.value)) {
        return { date: true };
    }

    return null;
}
