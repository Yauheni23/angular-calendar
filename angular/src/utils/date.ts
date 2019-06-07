export function getCountDaysInMonth( date ) {
    return 33 - new Date( date.getFullYear(), date.getMonth(), 33 ).getDate();
}

export function getDaysInMonth( date: Date ): number[][] {
    const arrayDaysInMonth = [];
    const dayOfWeek = new Date( date.getFullYear(), date.getMonth() ).getDay();
    const countWeeksInMonth = ( getCountDaysInMonth( date ) - 7 + dayOfWeek - 0.0001 ) / 7 | 0;

    for ( let i = 0; i <= countWeeksInMonth + 1; i++ ) {
        arrayDaysInMonth[ i ] = [];
        for ( let j = 0; j < 7; j++ ) {
            arrayDaysInMonth[ i ][ j ] = ( 7 * i ) + j + 1 - dayOfWeek;
        }
    }
    return arrayDaysInMonth;
}

export function getArrayDaysInWeek( date: Date ): number[] {
    const arrayDaysInWeek = [];
    const selectedDay = new Date( date );
    for ( let i = selectedDay.getDay(); i >= 0; i-- ) {
        arrayDaysInWeek.push( selectedDay.getDate() - i );
    }
    for ( let i = 1; i < 7 - selectedDay.getDay(); i++ ) {
        arrayDaysInWeek.push( selectedDay.getDate() + i );
    }

    return arrayDaysInWeek;
}

export function getTimeZone() {
    const timeZone = new Date().getTimezoneOffset() / 60 * -1 + '';
    if ( +timeZone > -10 && +timeZone < 0 ) {
        return `${timeZone[ 0 ]}0${timeZone[ 1 ]}`;
    }
    if ( +timeZone >= 0 && +timeZone < 10 ) {
        return `+0${timeZone[ 0 ]}`;
    }
    if ( +timeZone >= 10 ) {
        return `+${timeZone}`;
    }
    return timeZone;
}
