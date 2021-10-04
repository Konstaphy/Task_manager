import {authActionsType, authActionTypes, authState} from "./authTypes";

const defaultState: authState = {
    username: '',
    email: '',
    password: '',
    logged: false,
    user_id: 0,
    error: null
}

export const authReducer = (state = defaultState, action: authActionsType): authState => {
    switch (action.type) {
        case (authActionTypes.setUsername):
            return {...state, username: action.payload}
        case (authActionTypes.setEmail):
            return {...state, email: action.payload}
        case (authActionTypes.setPassword):
            return {...state, password: action.payload}
        default:
            return state
    }

}