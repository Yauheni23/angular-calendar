import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './components/main/month/month.component';
import { WeekComponent } from './components/main/week/week.component';
import { DayComponent } from './components/main/day/day.component';

const routes: Routes = [
    {
        path: 'month', component: MonthComponent, data: {
            mode: 'month',
        },
    },
    {
        path: 'week', component: WeekComponent, data: {
            mode: 'week',
        },
    },
    {
        path: 'day', component: DayComponent, data: {
            mode: 'day',
        },
    },
    {
        path: '',
        redirectTo: '/month',
        pathMatch: 'full',
    },
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ],
} )
export class AppRoutingModule {
}
