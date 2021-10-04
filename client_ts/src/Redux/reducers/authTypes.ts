// STATE
export interface authState {
    username: string,
    password: string,
    email: string,
    logged: boolean,
    user_id: number,
    error: null | string
}

// ACTION.TYPES
export enum authActionTypes {
    setEmail = 'setEmail',
    setUsername = 'setUsername',
    setPassword = 'setPassword',
    login = 'login',
    login_SUCCESS = 'login.s',
    login_ERROR = 'login.e',
    register = 'reg',
    register_SUCCESS = 'reg.s',
    register_ERROR = 'reg.e',
}

// ACTION
//login
interface loginPayload {
    username: string,
    password: string
}

interface login {
    action: authActionTypes.login,
    payload: loginPayload
}

interface loginSuccess {
    action: authActionTypes.login_SUCCESS,
    payload: undefined
}

interface loginError {
    action: authActionTypes.login_ERROR,
    payload: string
}

//Registration
//Setting current values

//ACTION TYPE
export type authActionsType = login | loginError | loginSuccess