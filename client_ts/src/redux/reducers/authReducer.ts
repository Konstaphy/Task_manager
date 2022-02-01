import { authActionsType, authActionTypes, authState } from "./authTypes";

const defaultState: authState = {
    registration: {
        username: "",
        email: "",
        password: "",
    },
    login: {
        username: "",
        password: "",
    },
    username: "",
    email: "",
    logged: false,
    user_id: 0,
    error: null,
    fetched: false,
};

export const authReducer = (state = defaultState, action: authActionsType): authState => {
    switch (action.type) {
        case authActionTypes.setUsername:
            return {
                ...state,
                login: { username: action.payload, password: state.login.password },
                username: action.payload,
            };
        case authActionTypes.setEmail:
            return { ...state, email: action.payload };
        case authActionTypes.setPassword:
            return { ...state, login: { password: action.payload, username: state.login.username } };
        case authActionTypes.setLogged:
            return {
                ...state,
                registration: {
                    username: "",
                    email: "",
                    password: "",
                },
                login: {
                    username: "",
                    password: "",
                },
                logged: true,
            };
        case authActionTypes.setLoggedOut:
            return { ...state, logged: false };
        case authActionTypes.setUserID:
            return { ...state, user_id: action.payload };
        case authActionTypes.setFetched:
            return { ...state, fetched: true };
        case authActionTypes.setError:
            return { ...state, error: action.payload };
        case authActionTypes.regSetUsername:
            return {
                ...state,
                registration: {
                    username: action.payload,
                    password: state.registration.password,
                    email: state.registration.email,
                },
                username: action.payload,
            };
        case authActionTypes.regSetEmail:
            return {
                ...state,
                registration: {
                    username: state.registration.username,
                    password: state.registration.password,
                    email: action.payload,
                },
                email: action.payload,
            };
        case authActionTypes.regSetPassword:
            return {
                ...state,
                registration: {
                    password: action.payload,
                    username: state.registration.username,
                    email: state.registration.email,
                },
            };
        default:
            return state;
    }
};
