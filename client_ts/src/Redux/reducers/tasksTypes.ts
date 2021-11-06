// State
export interface task {
    completed: boolean,
    task_id: number,
    date: Date,
    text: string
}

export interface tasksState {
    tasks: task[],
    active_task: task | null,
    count: number,
    fetched: boolean
}

export enum tasksActionTypes {
    setTasks = "SET_TASKS",
    setTaskToActive = "SET_TASK",
    toggleFetched = "SET_FETCHED"
}

// ACTION
//login
interface tasksSetEveryTask {
    type: tasksActionTypes.setTasks,
    payload: task[]
}

interface tasksSetOneTask {
    type: tasksActionTypes.setTaskToActive,
    payload: task
}

interface toggleFetched {
    type: tasksActionTypes.toggleFetched
}

//ACTION TYPE
export type tasksActionsType =
    | tasksSetOneTask
    | tasksSetEveryTask
    | toggleFetched


