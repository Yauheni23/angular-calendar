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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MonthComponent,
    WeekComponent,
    DayComponent,
    SelectModeComponent,
    DayByHourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
