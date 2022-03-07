import React, { useState } from "react";
import logo from "assets/logo.svg";
import { useDispatch } from "react-redux";
import "./login.scss";
import AuthInput from "../authInput/authInput";
import { LoginRequest } from "../../../../../models/http/login";
import { login } from "../../../redux/actionCreators/auth/login";

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const Login = async () => {
        const request: LoginRequest = {
            name,
            password,
        };
        dispatch(login(request));
    };

    //TODO: деструктуризовать
    return (
        <>
            <div className="login__video-bg">
                <div className="login__box">
                    <div className="login__form">
                        <div className="login__logo">
                            <img src={logo} alt="" />
                            <p>Log in to your account</p>
                        </div>
                        <div className="form">
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
