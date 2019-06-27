import { Task } from '../models/task';
import { convertInFormatInput } from './date';

export function considerSize( tasks: Task[] ) {
    const matrix = createMatrix( tasks );
    const sizeTasks = {};
    matrix.forEach( hour => {
        hour.forEach( ( id, i ) => {
            if ( !sizeTasks[ id ] ) {
                sizeTasks[ id ] = i;
            }
        } );
    } );

    return {
        ...sizeTasks,
        width: 99 / matrix.reduce( ( acc, currentValue ) => currentValue.length > acc ? currentValue.length : acc, 0 ),
    };
}

export function createMatrix( tasks: Task[] ): string[][] {
    const matrix = new Array( 48 );
    for ( let i = 0; i < 48; i++ ) {
        matrix[ i ] = [];
    }

    tasks.forEach( task => {
        const start = task.startDate.getHours() * 2 + ( task.startDate.getMinutes() === 30 ? 1 : 0 );
        let end = task.endDate.getHours() * 2 + ( task.endDate.getMinutes() === 30 ? 1 : 0 );
        const place = start !== end ? searchPlace( matrix.slice( start, end ), 0 ) : searchPlace( matrix.slice( start, ++end ), 0 );
        for ( let i = start; i < end; i++ ) {
            matrix[ i ][ place ] = task.id;
        }
    } );

    return matrix;
}

export function searchPlace( matrix: string[][], i: number ): number {
    if ( matrix.some( el => typeof el[ i ] === 'string' ) ) {
        return searchPlace( matrix, ++i );
    }

    return i;
}

export function considerTop( tasks: Task[][], date: Date ) {
    const matrix = createMatrixTop( tasks, date );
    const topTasks = {};
    matrix.forEach( day => {
        day.forEach( ( id, i ) => {
            if ( !topTasks[ id ] ) {
                topTasks[ id ] = i;
            }
        } );
    } );

    let maxSize = 0;
    for ( const size in topTasks ) {
        if ( maxSize < topTasks[ size ] + 1 ) {
            maxSize = topTasks[ size ] + 1;
        }
    }

    return {
        ...topTasks,
        maxSize,
    };
}

export function createMatrixTop( tasks: Task[][], date: Date ): string[][] {
    const matrix = new Array( 7 );
    for ( let i = 0; i < 7; i++ ) {
        matrix[ i ] = [];
    }

    tasks.forEach( ( day, index ) => {
        day.forEach( task => {
            const start = searchPlace( matrix.slice( index ), 0 );
            const count = ( ( task.endDate.getTime() + -new Date().getTimezoneOffset() * 60000 ) / 86400000 | 0 )
                - ( ( date.getTime() + -new Date().getTimezoneOffset() * 60000 ) / 86400000 | 0 ) - index;
            for ( let i = index; i <= index + count && i < 7; i++ ) {
                matrix[ i ][ start ] = task.id;
            }
        } );
    } );

    return matrix;
}

export function considerWidth( task: Task, displayedDate: Date ): number {
    let start = 6;
    if ( convertInFormatInput( task.startDate ) <= convertInFormatInput( displayedDate ) ) {
        start = displayedDate.getDay();
    }

    let end = task.endDate.getDay();
    if ( convertInFormatInput( new Date( displayedDate.setDate( displayedDate.getDate() + ( 6 - displayedDate.getDay() ) ) ) )
        <= convertInFormatInput( task.endDate ) ) {
        end = 6;
    }

    return 100 * ( end - start + 1 );
}
