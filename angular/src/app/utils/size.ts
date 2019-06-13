import { Task } from '../models/task';

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
        size: matrix.reduce( ( accumulator, currentValue ) => currentValue.length > accumulator ? currentValue.length : accumulator, 0 ),
    };
}

export function createMatrix( tasks: Task[] ) {
    const matrix = new Array( 48 );
    for ( let i = 0; i < 48; i++ ) {
        matrix[ i ] = [];
    }

    tasks.forEach( task => {
        const start = task.startDate.getHours() * 2 + (task.startDate.getMinutes() === 30 ? 1 : 0);
        const end = task.endDate.getHours() * 2 + (task.endDate.getMinutes() === 30 ? 1 : 0);
        const place = searchPlace( matrix.slice( start, end ), 0 );
        for ( let i = start; i < end; i++ ) {
            matrix[ i ][ place ] = task.id;
        }
    } );
    return matrix;
}

export function searchPlace( matrix: string[][], i: number ): number {
    if ( matrix.some( el => {
        return typeof el[ i ] === 'string';
    } ) ) {
        return searchPlace( matrix, ++i );
    } else {
        return i;
    }
}


