import * as types from '../../models/authTypes'

// Default values
const initialState: types.state = {
    isAuthed: false,
    user_id: null,
    token: null,
    login: {
        currentPassword: '',
        currentUsername: '',
        currentEmail: ''
    }
}


export const authReducer = (state = initialState, action: types.action): types.state => {
    switch (action.type) {
        // Handle login.currentUsername change
        case (types.actionUsersTypes.setUsername): {
            return {
                ...state,
                login: {
                    currentPassword: state.login.currentPassword,
                    currentUsername: action.payload,
                    currentEmail: state.login.currentEmail
                }
            }
        }
        // Handle login.currentPassword change
        case (types.actionUsersTypes.setPassword): {
            return {
                ...state,
                login: {
                    currentPassword: action.payload,
                    currentUsername: state.login.currentUsername,
                    currentEmail: state.login.currentEmail
                }
            }
        }
        // Handle login.currentEmail change
        case (types.actionUsersTypes.setEmail): {
            return {
                ...state,
                login: {
                    currentPassword: state.login.currentPassword,
                    currentUsername: state.login.currentUsername,
                    currentEmail: action.payload
                }
            }
        }
        // Logged in user information
        case (types.actionUsersTypes.login): {
            return {
                ...state,
                user_id: action.payload.id,
                isAuthed: true,
                token: action.payload.token
            }
        }
        default:
            return state
    }
}