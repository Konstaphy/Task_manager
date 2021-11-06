import {tasksActionsType, tasksActionTypes, tasksState} from "./tasksTypes";

const defaultState: tasksState = {
    tasks: [],
    active_task: null,
    count: 0,
    fetched: false
}

export const tasksReducer = (state = defaultState, action: tasksActionsType): tasksState => {
    switch (action.type) {
        case(tasksActionTypes.setTasks): {
            return {
                ...state,
                tasks: action.payload,
                count: action.payload.length
            }
        }
        case(tasksActionTypes.setTaskToActive): {
            return {
                ...state,
                active_task: action.payload,
            }
        }
        case(tasksActionTypes.toggleFetched): {
            return {...state, fetched: !state.fetched}
        }
        default:
            return state
    }
}