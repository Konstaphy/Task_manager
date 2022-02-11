import { tasksActionsType, tasksActionTypes, tasksState } from "redux/reducers/tasksTypes";

const defaultState: tasksState = {
    tasks: [],
    active_task: null,
    count: 0,
    type: "NONE",
    fetched: false,
    newTaskText: "",
};

export const tasksReducer = (state = defaultState, action: tasksActionsType): tasksState => {
    switch (action.type) {
        case tasksActionTypes.setTasks: {
            return {
                ...state,
                tasks: action.payload,
                count: action.payload.length,
            };
        }
        case tasksActionTypes.setTaskToActive: {
            return {
                ...state,
                active_task: action.payload,
                type: "READING",
            };
        }
        case tasksActionTypes.toggleFetched: {
            return { ...state, fetched: !state.fetched };
        }
        case tasksActionTypes.toggleType: {
            return { ...state, type: (state.type = "ADDING") };
        }
        case tasksActionTypes.setNewTaskText: {
            return { ...state, newTaskText: action.payload };
        }
        default:
            return state;
    }
};
