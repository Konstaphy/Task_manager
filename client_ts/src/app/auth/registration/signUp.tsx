import React, { useState } from "react";
import logo from "assets/logo.svg";
import "./signUp.scss";
import { Redirect } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../../redux/store";
import AuthInput from "../authInput/authInput";
import { signUp } from "../../../redux/actionCreators/auth/signUp";
import { SignUpRequest } from "../../../../../models/http/signUp";

const SignUp: React.FC = () => {
    const state = useTypedSelector(state => state.user);
    const dispatch = useTypedDispatch();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    if (state.user) {
        return <Redirect to="/tasks" />;
    }

    const register = () => {
        const userData: SignUpRequest = {
            name,
            email,
            password,
        };
        dispatch(signUp(userData));
    };

    // нейминги краш
    return (
        <>
            <div className="video__bg">
                <div className="login__box">
                    <div className="login__form">
                        <div className="login__logo">
                            <img src={logo} alt="" />
                            <p>Register new account</p>
                        </div>
                        <div className="form">
                            <AuthInput title="Username" setValue={e => setName(e.target.value)} value={name} />
                            <AuthInput title="Email" setValue={e => setEmail(e.target.value)} value={email} />
                            <AuthInput title="Username" setValue={e => setPassword(e.target.value)} value={password} />

                            <div className={"form__submit"}>
                                <button type="button" onClick={() => register()}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
