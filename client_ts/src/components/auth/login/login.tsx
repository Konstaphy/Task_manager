import React from 'react';
import logo from '../../assets/logo.svg'
import axiosInstance from "../../../server";
import {useTypedSelector} from "../../../hooks/hooks";
import {useDispatch} from "react-redux";
import {authActionTypes} from "../../../Redux/reducers/authTypes";
import {useHistory} from "react-router-dom";
import PopupMsg from "../../PopUpMessage/popup-msg";
import './login.css'


const Login: React.FC = () => {
    const history = useHistory()
    const state = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const Login = async () => {
        await axiosInstance.post('http://localhost:5050/api/login', {
            username: state.username,
            password: state.login.password
        }).then(r => {
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
        <>
            <div className="login__video-bg">
                <div className={"login__box"}>
                    <div className={"login__form"}>
                        <div className={"login__logo"}>
                            <img src={logo} alt=""/>
                            <p>Log in to your account</p>
                        </div>
                        <div className={"form"}>
                            <div className={"form__desc"}>
                                Username
                            </div>
                            <input className={"form__input"} type='text' onChange={(e) => changeUsername(e)} value={state.login.username}/>
                            <div className={"form__desc"}>
                                Password
                            </div>
                            <input className={"form__input"} type='password' onChange={(e) => changePassword(e)} value={state.login.password}/>
                            <div className={"form__submit"}>
                                <button type='button' onClick={() => Login()}>
                                    Login
                                </button>
                            </div>
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;