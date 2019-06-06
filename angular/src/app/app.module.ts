import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MonthComponent } from './main/month/month.component';
import { WeekComponent } from './main/week/week.component';
import { DayComponent } from './main/day/day.component';
import { SelectModeComponent } from './header/select-mode/select-mode.component';
import { DayByHourComponent } from './main/shared/day-by-hour/day-by-hour.component';
import { EditorTaskComponent } from './dialog/editor-task/editor-task.component';
import { ViewTaskComponent } from './dialog/view-task/view-task.component';
import { TaskComponent } from './main/shared/task/task.component';

@NgModule({
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
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
