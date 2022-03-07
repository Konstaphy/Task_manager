import React, { FC, useEffect } from "react";
import "../font.css";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Header from "app/content/header/header";
import "./app.css";
import { getCurrent } from "../redux/actionCreators/getCurrent";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../redux/store";
import ModalMessage from "../elements/modalMessage/modalMessage";
import { CommonStore } from "../redux/reducers/commonSlice";
import Auth from "./auth/auth";
import Content from "./content/content";

// TODO: loading
const App: FC = () => {
    const userState = useTypedSelector(state => state.user);
    const globalState = useTypedSelector(state => state.common);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrent());
    }, []);

    if (!userState.user) {
        return (
            <BrowserRouter>
                <Auth />
                <ModalMessage
                    text={globalState.fetching}
                    resetText={() => dispatch(CommonStore.actions.setFetched(""))}
                />
            </BrowserRouter>
        );
    }
    return (
        <BrowserRouter>
            <Header />
            <Content />
        </BrowserRouter>
    );
};

export default App;
