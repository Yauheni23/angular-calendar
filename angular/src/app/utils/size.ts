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
        width: 99 / matrix.reduce( ( acc, currentValue ) => currentValue.length > acc ? currentValue.length : acc, 0 ),
    };
}

export function createMatrix( tasks: Task[] ) {
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


