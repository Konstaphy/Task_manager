import React, { useState } from "react";
import logo from "assets/logo.svg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./login.scss";
import { useTypedSelector } from "../../../redux/store";
import AuthInput from "../authInput/authInput";
import { LoginRequest } from "../../../../../models/login";
import { login } from "../../../redux/actionCreators/login";

const Login: React.FC = () => {
    const history = useHistory();
    const state = useTypedSelector(state => state.user);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    //TODO: оч всратые диспатчи
    const Login = async () => {
        const request: LoginRequest = {
            name,
            password,
        };
        dispatch(login(request));
        // const loginResponse = await axiosInstance.post("/api/login", {
        //     username: state.login.username,
        //     password: state.login.password,
        // });
        // if (loginResponse.data.Error) {
        //     dispatch({ type: AuthActionTypes.setError, payload: loginResponse.data.Description });
        //     setTimeout(() => {
        //         dispatch({ type: AuthActionTypes.setError, payload: null });
        //     }, 5000);
        // } else {
        //     localStorage.setItem("token", loginResponse.data.accessToken);
        //     dispatch({ type: AuthActionTypes.SetUsername, payload: loginResponse.data.user.username });
        //     dispatch({ type: AuthActionTypes.setEmail, payload: loginResponse.data.user.email });
        //     dispatch({ type: AuthActionTypes.setUserID, payload: loginResponse.data.user.user_id });
        //     dispatch({ type: AuthActionTypes.setLogged });
        //     history.push("/profile");
        // }
    };

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
                            <AuthInput value={name} title="Username" setValue={e => setName(e.target.value)} />
                            <AuthInput value={password} title="Password" setValue={e => setPassword(e.target.value)} />
                            <div className={"form__submit"}>
                                <button type="button" onClick={() => Login()}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
