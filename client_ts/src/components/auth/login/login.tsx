import React from 'react';
import logo from '../../assets/logo.svg'
import {Box, Inp, Form, LoginForm, Logo, Submit, DescInp} from "./loginStyles";
import axiosInstance from "../../../server";
import {useTypedSelector} from "../../../hooks/hooks";
import {useDispatch} from "react-redux";
import {authActionTypes} from "../../../Redux/reducers/authTypes";
import {Redirect} from "react-router-dom";


const Login: React.FC = () => {
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const Login = async () => {
        await axiosInstance.post('http://localhost:5000/api/login', {
            username: state.username,
            password: state.password
        }).then(r => {
            console.log(r.data)
            localStorage.setItem('token', r.data.accessToken);
            return <Redirect to='/tasks'/>
        })

    }

    const changeUsername = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({type: authActionTypes.setUsername, payload: e.currentTarget.value})
    }

    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({type: authActionTypes.setPassword, payload: e.currentTarget.value})
    }

    if (state.logged) {
        return <Redirect to="/tasks"/>
    }

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
                    <Inp type='text' onChange={(e) => changeUsername(e)} value={state.username}/>
                    <DescInp>
                        Password
                    </DescInp>
                    <Inp type='text' onChange={(e) => changePassword(e)} value={state.password}/>
                    <Submit>
                        <button onClick={() => Login()}>
                            Login
                        </button>
                    </Submit>
                </Form>
            </LoginForm>
        </Box>
    );
};

export default Login;