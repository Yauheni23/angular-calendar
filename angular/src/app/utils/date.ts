import { Modes } from '../constants';
import { Task } from '../models/task';

export function getCountDaysInMonth(date): number {
    return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
}

export function getDaysInMonth(date: Date): number[][] {
    const arrayDaysInMonth = [];
    const dayOfWeek = new Date(date.getFullYear(), date.getMonth()).getDay();
    const countWeeksInMonth = (getCountDaysInMonth(date) - 7 + dayOfWeek - 0.0001) / 7 | 0;

    for (let i = 0; i <= countWeeksInMonth + 1; i++) {
        arrayDaysInMonth[i] = [];
        for (let j = 0; j < 7; j++) {
            arrayDaysInMonth[i][j] = (7 * i) + j + 1 - dayOfWeek;
        }
    }

    return arrayDaysInMonth;
}

export function getArrayDaysInWeek(date: Date): number[] {
    const arrayDaysInWeek = [];
    const selectedDay = new Date(date);
    for (let i = selectedDay.getDay(); i >= 0; i--) {
        arrayDaysInWeek.push(selectedDay.getDate() - i);
    }
    for (let i = 1; i < 7 - selectedDay.getDay(); i++) {
        arrayDaysInWeek.push(selectedDay.getDate() + i);
    }

    return arrayDaysInWeek;
}

export function getTimeZone(): string {
    const timeZone = new Date().getTimezoneOffset() / 60 * -1 + '';
    if (+timeZone > -10 && +timeZone < 0) {
        return `${timeZone[0]}0${timeZone[1]}`;
    }
    if (+timeZone >= 0 && +timeZone < 10) {
        return `+0${timeZone[0]}`;
    }
    if (+timeZone >= 10) {
        return `+${timeZone}`;
    }

    return timeZone;
}

export function validateDateFromInput(date: string): boolean {
    return date.search(/[1-9][0-9]{3}-((0[0-9])|(1[0-2]))-(([0-2][0-9])|(3[0-1]))/) !== -1;
}

export function convertInFormatInput(date: Date): string {
    let month = date.getMonth() + 1 + '';
    let day = date.getDate() + '';
    if (+month <= 9) {
        month = '0' + month;
    }

    if (+day <= 9) {
        day = '0' + day;
    }

    return `${date.getFullYear()}-${month}-${day}`;
}

export function changeDate(date: Date, mode: string, isPrev: boolean): void {
    const COUNT_DAY_IN_WEEK = 7;
    const prevOrNext = isPrev ? -1 : 1;

    switch (mode) {
        case Modes.Month:
            date.setMonth(date.getMonth() + prevOrNext);
            break;
        case Modes.Week:
            date.setDate(date.getDate() + prevOrNext * COUNT_DAY_IN_WEEK);
            break;
        case Modes.Day:
            date.setDate(date.getDate() + prevOrNext);
            break;
    }
}

export function createTimeMenu(): string[] {
    const timeMenu: string[] = [];

    for ( let i = 0; i < 48; i++ ) {
        let hours = '' + ( i / 2 | 0 );
        let minutes = ( i / 2 | 0 ) + '';
        if ( +hours < 10 ) {
            hours = '0' + hours;
        }
        if ( i % 2 ) {
            minutes = '30';
        } else {
            minutes = '00';
        }
        timeMenu.push( `${hours}:${minutes}` );
    }

    return timeMenu;
}


export function isTaskForSeveralDays(task: Task, date: Date ): boolean {
    return convertInFormatInput(task.startDate) <= convertInFormatInput(date)
        && convertInFormatInput(date) <= convertInFormatInput(task.endDate)
        && convertInFormatInput(task.startDate) !== convertInFormatInput(task.endDate);
}
