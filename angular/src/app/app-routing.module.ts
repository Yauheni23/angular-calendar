import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './main/month/month.component';
import { WeekComponent } from './main/week/week.component';
import { DayComponent } from './main/day/day.component';

const routes: Routes = [
  { path: 'month', component: MonthComponent},
  { path: 'week', component: WeekComponent},
  { path: 'day', component: DayComponent},
  { path: '',
    redirectTo: '/month',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
