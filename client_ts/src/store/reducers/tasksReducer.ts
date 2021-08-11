import * as types from '../../models/tasksTypes'
import {tasksActions} from "../../models/tasksTypes";

const initialState: types.tasksState = {
    count: 0,
    tasks: []
}

export const taskReducer = (state = initialState, action: tasksActions) => {
    switch (action.type) {
        case (types.actionsTasksTypes.createTasks):
            const newTasks = state.tasks.push(action.payload)
            return {
                ...state,
                tasks: newTasks
            }
        default:
            return state

    }
}