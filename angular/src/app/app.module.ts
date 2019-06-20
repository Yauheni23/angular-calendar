import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MonthComponent } from './components/main/month/month.component';
import { WeekComponent } from './components/main/week/week.component';
import { DayComponent } from './components/main/day/day.component';
import { SelectModeComponent } from './components/header/select-mode/select-mode.component';
import { DayByHourComponent } from './components/main/shared/day-by-hour/day-by-hour.component';
import { EditorTaskComponent } from './components/dialog/editor-task/editor-task.component';
import { ViewTaskComponent } from './components/dialog/view-task/view-task.component';
import { TaskComponent } from './components/main/shared/task/task.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material';
import { InputComponent } from './components/date-picker/input/input.component';
import { CalendarComponent } from './components/date-picker/calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/date-picker/button/button.component';
import { SelectTimeComponent } from './components/select-time/select-time.component';
import { TaskForMonthComponent } from './components/main/shared/task-for-month/task-for-month.component';
import { TaskForSeveralDaysComponent } from './components/main/shared/task-for-several-days/task-for-several-days.component';
import { DialogComponent } from './components/dialog/dialog/dialog.component';


@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        MonthComponent,
        WeekComponent,
        DayComponent,
        SelectModeComponent,
        DayByHourComponent,
        EditorTaskComponent,
        ViewTaskComponent,
        TaskComponent,
        DatePickerComponent,
        InputComponent,
        CalendarComponent,
        ButtonComponent,
        SelectTimeComponent,
        TaskForMonthComponent,
        TaskForSeveralDaysComponent,
        DialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [ AppComponent ],
} )
export class AppModule {
}
