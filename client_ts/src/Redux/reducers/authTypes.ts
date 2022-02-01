// STATE
interface registration {
    username: string;
    email: string;
    password: string;
}

interface login {
    username: string;
    password: string;
}

export interface authState {
    login: login;
    registration: registration;
    username: string;
    email: string;
    logged: boolean;
    user_id: number;
    error: null | string;
    fetched: boolean;
}

// ACTION.TYPES
export enum authActionTypes {
    setEmail = "setEmail",
    setUsername = "setUsername",
    setPassword = "setPassword",
    setLogged = "setLogged",
    setUserID = "setUserID",
    setFetched = "setFetched",
    setError = "setError",
    regSetUsername = "setUNREG",
    regSetEmail = "setEMREG",
    regSetPassword = "setPWREG",
    setLoggedOut = "setLoggedOut",
}

// ACTION
//login
interface loginSetUsername {
    type: authActionTypes.setUsername;
    payload: string;
}

interface loginSetEmail {
    type: authActionTypes.setEmail;
    payload: string;
}

interface loginSetPassword {
    type: authActionTypes.setPassword;
    payload: string;
}

interface loginSetLogged {
    type: authActionTypes.setLogged;
}

interface loginSetLoggedOut {
    type: authActionTypes.setLoggedOut;
}

interface loginSetUserID {
    type: authActionTypes.setUserID;
    payload: number;
}

interface loginSetFetched {
    type: authActionTypes.setFetched;
}

interface loginSetError {
    type: authActionTypes.setError;
    payload: string;
}

//Registration
interface regSetEmail {
    type: authActionTypes.regSetEmail;
    payload: string;
}

interface regSetPassword {
    type: authActionTypes.regSetPassword;
    payload: string;
}

interface regSetUsername {
    type: authActionTypes.regSetUsername;
    payload: string;
}

//Setting current values

//ACTION TYPE
export type authActionsType =
    | loginSetUsername
    | loginSetEmail
    | loginSetPassword
    | loginSetLogged
    | loginSetUserID
    | loginSetFetched
    | loginSetError
    | regSetEmail
    | regSetPassword
    | regSetUsername
    | loginSetLoggedOut;
