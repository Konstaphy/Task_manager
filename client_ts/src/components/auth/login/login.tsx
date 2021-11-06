import React from 'react';
import logo from '../../assets/logo.svg'
import {Box, Inp, Form, LoginForm, Logo, Submit, DescInp} from "./loginStyles";
import axiosInstance from "../../../server";
import {useTypedSelector} from "../../../hooks/hooks";
import {useDispatch} from "react-redux";
import {authActionTypes} from "../../../Redux/reducers/authTypes";
import {useHistory} from "react-router-dom";
import PopupMsg from "../../popup-msg";


const Login: React.FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const Login = async () => {
        await axiosInstance.post('http://localhost:5000/api/login', {
            username: state.username,
            password: state.login.password
        }).then(r => {
            console.log(r)
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


    const changeUsername = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({type: authActionTypes.setUsername, payload: e.currentTarget.value})
    }

    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({type: authActionTypes.setPassword, payload: e.currentTarget.value})
    }

    const error = state.error !== null ? <PopupMsg error={true} text={state.error}/> : <></>

    return (
        <Box>
            <LoginForm>
                <Logo>
                    <img src={logo} alt=""/>
                    <p>Log in to your account</p>
                </Logo>
                <Form>
                    <DescInp>
                        Username
                    </DescInp>
                    <Inp type='text' onChange={(e) => changeUsername(e)} value={state.login.username}/>
                    <DescInp>
                        Password
                    </DescInp>
                    <Inp type='password' onChange={(e) => changePassword(e)} value={state.login.password}/>
                    <Submit>
                        <button type='button' onClick={() => Login()}>
                            Login
                        </button>
                    </Submit>
                    {error}

                </Form>
            </LoginForm>
        </Box>
    );
};

export default Login;