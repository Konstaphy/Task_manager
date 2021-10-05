import {authActionsType, authActionTypes, authState} from "./authTypes";

const defaultState: authState = {
    username: '',
    email: '',
    password: '',
    logged: false,
    user_id: 0,
    error: null,
    fetched: false
}

export const authReducer = (state = defaultState, action: authActionsType): authState => {
    switch (action.type) {
        case (authActionTypes.setUsername):
            return {...state, username: action.payload}
        case (authActionTypes.setEmail):
            return {...state, email: action.payload}
        case (authActionTypes.setPassword):
            return {...state, password: action.payload}
        case (authActionTypes.setLogged):
            return {...state, logged: true}
        case (authActionTypes.setFetched):
            return {...state, fetched: true}
        case (authActionTypes.setError):
            return {...state, error: action.payload}
        default:
            return state
    }

}