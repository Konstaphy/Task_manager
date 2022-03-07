import React from "react";
import logo from "assets/logo.svg";
import "./registration.scss";
import { Redirect, useHistory } from "react-router-dom";
import { useTypedSelector } from "hooks/hooks";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "redux/reducers/authTypes";
import axiosInstance from "server";
import ModalMessage from "app/modalMessage/modalMessage";

//TODO: классы и диспатчи ахуенные конечно, деструктуризация лютая нужна
const Registration: React.FC = () => {
    const history = useHistory();
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    if (state.logged) {
        return <Redirect to="/tasks" />;
    }

    const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch({ type: AuthActionTypes.regSetUsername, payload: e.currentTarget.value });
    };
    const changePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch({ type: AuthActionTypes.regSetPassword, payload: e.currentTarget.value });
    };
    const changeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        dispatch({ type: AuthActionTypes.regSetEmail, payload: e.currentTarget.value });
    };

    const register = () => {
        axiosInstance
            .post("/api/registration", {
                username: state.registration.username,
                email: state.registration.email,
                password: state.registration.password,
            })
            .then(r => {
                if (r.data.Error) {
                    dispatch({ type: AuthActionTypes.setError, payload: r.data.Description });
                    setTimeout(() => {
                        dispatch({ type: AuthActionTypes.setError, payload: null });
                    }, 5000);
                } else {
                    localStorage.setItem("token", r.data.accessToken);
                    dispatch({ type: AuthActionTypes.SetUsername, payload: r.data.user.username });
                    dispatch({ type: AuthActionTypes.setEmail, payload: r.data.user.email });
                    dispatch({ type: AuthActionTypes.setUserID, payload: r.data.user.user_id });
                    dispatch({ type: AuthActionTypes.setLogged });
                    history.push("/profile");
                }
            });
    };

    const error = state.error !== null ? <ModalMessage error={true} text={state.error} /> : <></>;

    // нейминги краш
    return (
        <>
            <div className="video__bg">
                <div className={"login__box"}>
                    <div className={"login__form"}>
                        <div className={"login__logo"}>
                            <img src={logo} alt="" />
                            <p>Register new account</p>
                        </div>
                        <div className={"form"}>
                            <div className={"form__desc"}>Username</div>
                            <input
                                className={"form__input"}
                                type="text"
                                onChange={e => changeUsername(e)}
                                value={state.registration.username}
                            />
                            <div className={"form__desc"}>Password</div>
                            <input
                                className={"form__input"}
                                type="password"
                                onChange={e => changePassword(e)}
                                value={state.registration.password}
                            />
                            <div className={"form__desc"}>Email</div>
                            <input
                                className={"form__input"}
                                type="email"
                                onChange={e => changeEmail(e)}
                                value={state.registration.email}
                            />
                            <div className={"form__submit"}>
                                <button type="button" onClick={() => register()}>
                                    Register
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

export default Registration;