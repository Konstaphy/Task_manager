// State
export interface task {
    completed: boolean;
    task_id: number;
    date: Date;
    message: string;
    description: string;
}

type types = "ADDING" | "READING" | "NONE";

export interface tasksState {
    tasks: task[];
    active_task: task | null;
    count: number;
    type: types;
    fetched: boolean;
    newTaskText: string;
}

export enum tasksActionTypes {
    setTasks = "SET_TASKS",
    setTaskToActive = "SET_TASK",
    toggleFetched = "SET_FETCHED",
    toggleType = "TOGGLE_TYPE",
    setNewTaskText = "SET_NEW_TASK_TEXT",
}

// ACTION
//login
interface tasksSetEveryTask {
    type: tasksActionTypes.setTasks;
    payload: task[];
}

interface tasksSetOneTask {
    type: tasksActionTypes.setTaskToActive;
    payload: task | null;
}

interface toggleFetched {
    type: tasksActionTypes.toggleFetched;
}

interface toggleTypes {
    type: tasksActionTypes.toggleType;
}

interface setNewTaskText {
    type: tasksActionTypes.setNewTaskText;
    payload: string;
}

//ACTION TYPE
export type tasksActionsType = tasksSetOneTask | tasksSetEveryTask | toggleFetched | toggleTypes | setNewTaskText;
