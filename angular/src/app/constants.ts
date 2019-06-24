export const calendar = {
    MONTH_SHORT: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    DAYS_OF_WEEK_SHORT: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
    MONTH: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    DAYS_OF_WEEK: [ 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ],
    MODES: ['month', 'week', 'day']
}

export const size = {
    heightHour: 48,
    heightDay: 48 * 24,
}

export enum Time {
    HourInMilliseconds = 3600000,
    DayInMilliseconds = 3600000 * 24
}

export enum modes {
    Month = 'month',
    Week = 'week',
    Day = 'day',
}
