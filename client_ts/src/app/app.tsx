import React, { FC, useEffect, useRef } from "react";
import "../font.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Header from "app/header/header";
import Registration from "app/auth/registration/registration";
import Login from "app/auth/login/login";
import Tasks from "app/tasks/tasks";
import { useTypedSelector } from "hooks/hooks";
import { useDispatch } from "react-redux";
import Profile from "app/profile/profile";
import "./app.cssss";
import ModalMessage from "app/modalMessage/modalMessage";
import { ApiService } from "../service/api/apiService";

const App: FC = () => {
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: в отдельный файл
        ApiService.GetCurrent()
            .then(r => {
                // TODO: в один диспатч
                dispatch({ type: AuthActionTypes.SetUsername, payload: r.username });
                dispatch({ type: AuthActionTypes.setEmail, payload: r.email });
                dispatch({ type: AuthActionTypes.setUserID, payload: r.data.user.user_id });
                dispatch({ type: AuthActionTypes.setLogged });
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                dispatch({ type: AuthActionTypes.setFetched });
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
