import React, { useState } from "react";
import logo from "assets/logo.svg";
import "./registration.scss";
import { Redirect, useHistory } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../../redux/store";
import ModalMessage from "../../../elements/modalMessage/modalMessage";
import AuthInput from "../authInput/authInput";

//TODO: классы и диспатчи ахуенные конечно, деструктуризация лютая нужна
const Registration: React.FC = () => {
    const history = useHistory();
    const state = useTypedSelector(state => state.user);
    const dispatch = useTypedDispatch();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    if (state.user) {
        return <Redirect to="/tasks" />;
    }

    const register = () => {
        // axiosInstance
        //     .post("/api/registration", {
        //         name: name,
        //         email: email,
        //         password: password,
        //     })
        //     .then(r => {
        //         if (r.data.Error) {
        //             dispatch({ type: AuthActionTypes.setError, payload: r.data.Description });
        //             setTimeout(() => {
        //                 dispatch({ type: AuthActionTypes.setError, payload: null });
        //             }, 5000);
        //         } else {
        //             localStorage.setItem("token", r.data.accessToken);
        //             dispatch({ type: AuthActionTypes.SetUsername, payload: r.data.user.username });
        //             dispatch({ type: AuthActionTypes.setEmail, payload: r.data.user.email });
        //             dispatch({ type: AuthActionTypes.setUserID, payload: r.data.user.user_id });
        //             dispatch({ type: AuthActionTypes.setLogged });
        //             history.push("/profile");
        //         }
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

export default Registration;
