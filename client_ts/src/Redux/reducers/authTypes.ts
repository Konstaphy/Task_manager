// STATE
export interface authState {
    username: string,
    password: string,
    email: string,
    logged: boolean,
    user_id: number,
    error: null | string,
    fetched: boolean
}

// ACTION.TYPES
export enum authActionTypes {
    setEmail = 'setEmail',
    setUsername = 'setUsername',
    setPassword = 'setPassword',
    setLogged = 'setLogged',
    setUserID = 'setUserID',
    setFetched = 'setFetched'
}

// ACTION
//login
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

interface loginSetUserID {
    type: authActionTypes.setUserID,
    payload: number
}

interface loginSetFetched {
    type: authActionTypes.setFetched
}

//Registration
//Setting current values

//ACTION TYPE
export type authActionsType =
    | loginSetUsername
    | loginSetEmail
    | loginSetPassword
    | loginSetLogged
    | loginSetUserID
    | loginSetFetched