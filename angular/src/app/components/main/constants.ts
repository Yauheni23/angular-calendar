import { Task } from '../../models/task';

const date = new Date();
date.setSeconds(0);
export const tasksDefault: Task[] = [ {
    id: '1',
    name: 'Error',
    startDate: new Date( date.setHours( 11, 0 ) ),
    endDate: new Date( date.setHours( 15, 30 ) ),
}, {
    id: '2',
    name: 'Error2',
    startDate: new Date( date.setHours( 1, 0 ) ),
    endDate: new Date( date.setHours( 4, 30 ) ),
}, {
    id: '3',
    name: 'Error2',
    startDate: new Date( date.setHours( 0, 0 ) ),
    endDate: new Date( date.setHours( 2, 0 ) ),
}, {
    id: '4',
    name: 'Error2',
    startDate: new Date( date.setHours( 1, 0 ) ),
    endDate: new Date( date.setHours( 4, 30 ) ),
}, {
    id: '5',
    name: 'Error22312312ewqeqwd',
    startDate: new Date( date.setHours( 3, 0 ) ),
    endDate: new Date( date.setHours( 23, 0 ) ),
}, {
    id: '6',
    name: 'Error2',
    startDate: new Date( date.setHours( 2, 0 ) ),
    endDate: new Date( date.setHours( 4, 0 ) ),
}, {
    id: '7',
    name: 'Error2',
    startDate: new Date( date.setHours( 0, 0 ) ),
    endDate: new Date( date.setHours( 23, 30 ) ),
}, {
    id: '8',
    name: 'Error2',
    startDate: new Date( date.setHours( 0, 0 ) ),
    endDate: new Date( date.setHours( 1, 0 ) ),
}, {
    id: '9',
    name: 'Error2',
    startDate: new Date( 2019, 5, 10, 5, 0 ),
    endDate: new Date( 2019, 5, 20, 10, 30 ),
},
];
