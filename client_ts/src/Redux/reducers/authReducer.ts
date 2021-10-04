import {authActionsType, authState} from "./authTypes";

const defaultState: authState = {
    username: '',
    password: '',
    email: '',
    logged: false,
    user_id: 0,
    error: null
}

export const authReducer = (state = defaultState, action: authActionsType): authState => {
    switch (action.payload) {
        case (''):
            return {...state}
        default:
            return state
    }

}