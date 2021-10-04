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
    setLogged = 'setLogged',
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
    type: authActionTypes.login,
    payload: loginPayload
}

interface loginSuccess {
    type: authActionTypes.login_SUCCESS,
    payload: undefined
}

interface loginError {
    type: authActionTypes.login_ERROR,
    payload: string
}

interface loginSetUsername {
    type: authActionTypes.setUsername,
    payload: string
}

interface loginSetEmail {
    type: authActionTypes.setEmail,
    payload: string
}

interface loginSetPassword {
    type: authActionTypes.setPassword,
    payload: string
}

interface loginSetLogged {
    type: authActionTypes.setLogged
}


//Registration
//Setting current values

//ACTION TYPE
export type authActionsType =
    login
    | loginError
    | loginSuccess
    | loginSetUsername
    | loginSetEmail
    | loginSetPassword
    | loginSetLogged