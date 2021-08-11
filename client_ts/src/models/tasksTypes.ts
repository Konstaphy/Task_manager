// TS

// state
interface task {
    text: string;
    task_id: number;
    date: string;
    completed: boolean;
    user_id: string;
}

export interface tasksState {
    count: number;
    tasks: task[];
}

//actions

export enum actionsTasksTypes {
    createTasks = 'Create_Tasks',
    deleteTask = 'Delete_tasks'
}

//action types

export interface createTaskAction {
    type: actionsTasksTypes.createTasks;
    payload: task;
}

export interface deleteTaskAction {
    type: actionsTasksTypes.deleteTask;
    payload: number;
}

export type tasksActions = createTaskAction | deleteTaskAction