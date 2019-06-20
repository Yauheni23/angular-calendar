import { Injectable } from '@angular/core';
import { DialogService } from '../components/dialog/dialog/dialog.service';

@Injectable({
    providedIn: 'root',
})
export class ViewService extends DialogService {}
