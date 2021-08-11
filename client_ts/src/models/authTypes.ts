// TS

// state
interface login {
    currentUsername: string;
    currentPassword: string;
    currentEmail: string;
}

export interface state {
    isAuthed: boolean;
    user_id: null | number;
    token: null | string;
    login: login;
}


// action

export enum actionUsersTypes {
    setUsername = 'setUsername',
    setPassword = 'setPassword',
    login = 'login',
    setEmail = 'setEmail'
}


// action types
export interface setUsernameAction {
    type: actionUsersTypes.setUsername;
    payload: string;
}

export interface setPasswordAction {
    type: actionUsersTypes.setPassword;
    payload: string;
}

export interface setEmailAction {
    type: actionUsersTypes.setEmail;
    payload: string;
}

interface loginPayload {
    id: number;
    token: string;
}

export interface loginAction {
    type: actionUsersTypes.login;
    payload: loginPayload;
}


// common action type
export type action = setUsernameAction | setPasswordAction | setEmailAction | loginAction