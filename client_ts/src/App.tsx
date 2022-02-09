import React, { FC, useEffect, useRef } from "react";
import "./Font.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Header from "./components/header/header";
import Registration from "./components/auth/registration/registration";
import Login from "./components/auth/login/login";
import Tasks from "./components/tasks/tasks";
import { useTypedSelector } from "./hooks/hooks";
import axiosInstance from "./server";
import { useDispatch } from "react-redux";
import { authActionTypes } from "./redux/reducers/authTypes";
import Profile from "./components/profile/profile";
import "./app.css";
import ModalMessage from "./components/modalMessage/modalMessage";

const App: FC = () => {
    const socket = useRef<WebSocket | null>(null);
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.current = new WebSocket("ws://localhost:5001");

        socket.current.onopen = () => {
            console.log("open");
        };

        //TODO: в отдельный файл
        axiosInstance
            .get("/api/refresh")
            .then(r => {
                if (r.data.Error) {
                    throw new Error(r.data.Description);
                }
                localStorage.setItem("token", r.data.accessToken);
                // TODO: в один диспатч
                dispatch({ type: authActionTypes.setUsername, payload: r.data.user.username });
                dispatch({ type: authActionTypes.setEmail, payload: r.data.user.email });
                dispatch({ type: authActionTypes.setUserID, payload: r.data.user.user_id });
                dispatch({ type: authActionTypes.setLogged });
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                dispatch({ type: authActionTypes.setFetched });
            });
    }, [dispatch]);

    if (!state.fetched) {
        return <ModalMessage error={false} text="Loading..." />;
    }
    if (!state.logged) {
        return (
            <BrowserRouter>
                <div className="deleting">
                    <Header />
                    <Route path="/registration">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route exact path="*">
                        <Redirect to="/login" />
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
    return (
        <BrowserRouter>
            <Header />
            <div className="wrapper">
                <Route path="/tasks">
                    <Tasks />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Redirect to="/profile" />
                </Route>
            </div>
        </BrowserRouter>
    );
};

export default App;
