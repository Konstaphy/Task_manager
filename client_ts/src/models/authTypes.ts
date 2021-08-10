// TS

// state
interface login {
    currentUsername: string;
    currentPassword: string;
}

export interface state {
    isAuthed: boolean;
    user_id: null | number;
    token: null | string;
    login: login;
}


// action

export enum actionTypes {
    setUsername = 'setUsername',
    setPassword = 'setPassword',
    login = 'login'
}


// action types
export interface setUsernameAction {
    type: actionTypes.setUsername;
    payload: string;
}

export interface setPasswordAction {
    type: actionTypes.setPassword;
    payload: string;
}

interface loginPayload {
    id: number;
    token: string;
}

export interface loginAction {
    type: actionTypes.login;
    payload: loginPayload;
}

// common action type
export type action = setUsernameAction | setPasswordAction | loginAction