export interface Task {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

export interface TaskResponse {
    id: string;
    name: string;
    startDate: Date | string;
    endDate: Date | string;
}
