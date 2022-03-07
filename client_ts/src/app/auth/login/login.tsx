import React from "react";
import logo from "assets/logo.svg";
import axiosInstance from "server";
import { useTypedSelector } from "hooks/hooks";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "redux/reducers/authTypes";
import { useHistory } from "react-router-dom";
import ModalMessage from "app/modalMessage/modalMessage";
import "./login.scss";

const Login: React.FC = () => {
    const history = useHistory();
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    //TODO: оч всратые диспатчи
    const Login = async () => {
        const loginResponce = await axiosInstance.post("/api/login", {
            username: state.login.username,
            password: state.login.password,
        });
        if (loginResponce.data.Error) {
            dispatch({ type: AuthActionTypes.setError, payload: loginResponce.data.Description });
            setTimeout(() => {
                dispatch({ type: AuthActionTypes.setError, payload: null });
            }, 5000);
        } else {
            localStorage.setItem("token", loginResponce.data.accessToken);
            dispatch({ type: AuthActionTypes.SetUsername, payload: loginResponce.data.user.username });
            dispatch({ type: AuthActionTypes.setEmail, payload: loginResponce.data.user.email });
            dispatch({ type: AuthActionTypes.setUserID, payload: loginResponce.data.user.user_id });
            dispatch({ type: AuthActionTypes.setLogged });
            history.push("/profile");
        }
    };

    const changeUsername = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: AuthActionTypes.SetUsername, payload: e.currentTarget.value });
    };

    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: AuthActionTypes.setPassword, payload: e.currentTarget.value });
    };

    const error = state.error !== null ? <ModalMessage error={true} text={state.error} /> : <></>;

    //TODO: деструктуризовать
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