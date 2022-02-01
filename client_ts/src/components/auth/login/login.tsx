import React from "react";
import logo from "../../assets/logo.svg";
import axiosInstance from "../../../server";
import { useTypedSelector } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { authActionTypes } from "../../../redux/reducers/authTypes";
import { useHistory } from "react-router-dom";
import ModalMessage from "../../modalMessage/modalMessage";
import "./login.css";

const Login: React.FC = () => {
    const history = useHistory();
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    const Login = async () => {
        const loginResponce = await axiosInstance.post("/api/login", {
            username: state.login.username,
            password: state.login.password,
        });
        if (loginResponce.data.Error) {
            dispatch({ type: authActionTypes.setError, payload: loginResponce.data.Description });
            setTimeout(() => {
                dispatch({ type: authActionTypes.setError, payload: null });
            }, 5000);
        } else {
            localStorage.setItem("token", loginResponce.data.accessToken);
            dispatch({ type: authActionTypes.setUsername, payload: loginResponce.data.user.username });
            dispatch({ type: authActionTypes.setEmail, payload: loginResponce.data.user.email });
            dispatch({ type: authActionTypes.setUserID, payload: loginResponce.data.user.user_id });
            dispatch({ type: authActionTypes.setLogged });
            history.push("/profile");
        }
    };

    const changeUsername = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: authActionTypes.setUsername, payload: e.currentTarget.value });
    };

    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: authActionTypes.setPassword, payload: e.currentTarget.value });
    };

    const error = state.error !== null ? <ModalMessage error={true} text={state.error} /> : <></>;

    return (
        <>
            <div className="login__video-bg">
                <div className={"login__box"}>
                    <div className={"login__form"}>
                        <div className={"login__logo"}>
                            <img src={logo} alt="" />
                            <p>Log in to your account</p>
                        </div>
                        <div className={"form"}>
                            <div className={"form__desc"}>Username</div>
                            <input
                                className={"form__input"}
                                type="text"
                                onChange={e => changeUsername(e)}
                                value={state.login.username}
                            />
                            <div className={"form__desc"}>Password</div>
                            <input
                                className={"form__input"}
                                type="password"
                                onChange={e => changePassword(e)}
                                value={state.login.password}
                            />
                            <div className={"form__submit"}>
                                <button type="button" onClick={() => Login()}>
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
