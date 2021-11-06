import React from 'react';
import logo from "../../assets/logo.svg";
import {Box, Inp, DescInp, Submit, Form, LoginForm, Logo} from "./regStyles";
import {Redirect, useHistory} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/hooks";
import {useDispatch} from "react-redux";
import {authActionTypes} from "../../../Redux/reducers/authTypes";
import axiosInstance from "../../../server";
import PopupMsg from "../../popup-msg";


const Registration: React.FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    if (state.logged) {
        return <Redirect to="/tasks"/>
    }

    const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch({type: authActionTypes.regSetUsername, payload: e.currentTarget.value})
    }
    const changePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch({type: authActionTypes.regSetPassword, payload: e.currentTarget.value})
    }
    const changeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch({type: authActionTypes.regSetEmail, payload: e.currentTarget.value})
    }

    const register = () => {
        axiosInstance.post('/api/registration', {
            username: state.registration.username,
            email: state.registration.email,
            password: state.registration.password
        }).then((r) => {
            if (r.data.Error) {
                dispatch({type: authActionTypes.setError, payload: r.data.Description})
                setTimeout(() => {
                    dispatch({type: authActionTypes.setError, payload: null})
                }, 5000)
            } else {
                localStorage.setItem('token', r.data.accessToken);
                dispatch({type: authActionTypes.setUsername, payload: r.data.user.username})
                dispatch({type: authActionTypes.setEmail, payload: r.data.user.email})
                dispatch({type: authActionTypes.setUserID, payload: r.data.user.user_id})
                dispatch({type: authActionTypes.setLogged})
                history.push('/profile')
            }

        })
    }

    const error = state.error !== null ? <PopupMsg error={true} text={state.error}/> : <></>

    return (
        <Box>
            <LoginForm>
                <Logo>
                    <img src={logo} alt=""/>
                    <p>Register a new account</p>
                </Logo>
                <Form>
                    <DescInp>
                        Username
                    </DescInp>
                    <Inp type='text' value={state.registration.username} onChange={(e) => changeUsername(e)}/>
                    <DescInp>
                        Email
                    </DescInp>
                    <Inp type='email' value={state.registration.email} onChange={(e) => changeEmail(e)}/>
                    <DescInp>
                        Password
                    </DescInp>
                    <Inp type='password' value={state.registration.password} onChange={(e) => changePassword(e)}/>
                    <Submit>
                        <button onClick={() => register()}>
                            Register
                        </button>
                    </Submit>
                </Form>
            </LoginForm>
            {error}
        </Box>
    );
};

export default Registration;